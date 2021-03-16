var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        // arcade: { debug: true }
    },
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.RESIZE,
    },
    width: 360,
    height: 767,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var debug;
var source;
var target = new Phaser.Math.Vector2();
var distanceText;
var graphics;
var text;

var game = new Phaser.Game(config);




function preload ()
{

    this.load.image('map', 'assets/map.png');

    this.iter = 3.14;




    //MOVE TO POINTER START
    this.load.image('block', 'assets/buttonRound_beige.png');
    this.load.image('blue', 'assets/Alien3.png');
    this.load.image('cursor', 'assets/Alien1.png');
    //MOVE TO POINTER END




    //ROTATE AROUND X Y START
    this.load.image('diamonds', 'assets/buttonRound_beige.png', { frameWidth: 32, frameHeight: 24 });
    this.load.image('diamonds2', 'assets/buttonRound_beige.png', { frameWidth: 32, frameHeight: 24 });
    //ROTATE AROUND X Y END




    //KENNEY SPRITESHEET START
    this.load.image('adventurer', 'assets/kenney_tooncharacters1/Male_adventurer/PNG/Poses_HD/character_maleAdventurer_idle.png', { frameWidth: 192, frameHeight: 256 });

    this.load.path = ('walk', 'assets/kenney_tooncharacters1/Male_adventurer/PNG/Poses_HD/');

        this.load.image('walk0', 'character_maleAdventurer_walk0.png');
        this.load.image('walk1', 'character_maleAdventurer_walk1.png');
        this.load.image('walk2', 'character_maleAdventurer_walk2.png');
        this.load.image('walk3', 'character_maleAdventurer_walk3.png');
        this.load.image('walk4', 'character_maleAdventurer_walk4.png');
        this.load.image('walk5', 'character_maleAdventurer_walk5.png');
        this.load.image('walk6', 'character_maleAdventurer_walk6.png');
        this.load.image('walk7', 'character_maleAdventurer_walk7.png');


        this.load.path = ('spell', 'assets/kenney_tooncharacters1/Fart/');

        this.load.image('fart0', 'fart00.png');
        this.load.image('fart1', 'fart01.png');
        this.load.image('fart2', 'fart02.png');
        this.load.image('fart3', 'fart03.png');
        this.load.image('fart4', 'fart04.png');
        this.load.image('fart5', 'fart05.png');
        this.load.image('fart6', 'fart06.png');
        this.load.image('fart7', 'fart07.png');
        this.load.image('fart8', 'fart08.png');
    //KENNEY SPRITESHEET END

}


function create ()
{
    //CAMERA OFFSET1 START
    this.cameras.main.setBounds(0, 0, 360 * 8, 767 * 8);
    this.physics.world.setBounds(0, 0, 360 * 8, 767 * 8);

    this.add.image(0, 0, 'map').setOrigin(0);
        this.add.image(360, 0, 'map').setOrigin(0).setFlipX(false);
        this.add.image(0, 767, 'map').setOrigin(0).setFlipY(false);
        this.add.image(360, 767, 'map').setOrigin(0).setFlipX(false).setFlipY(false);

    this.cameras.main.setSize(360 * 4, 767 * 4);
    //CAMERA OFFSET1 END




        //SPRITESHEET ANIMATION START
        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'walk0' },
                { key: 'walk1' },
                { key: 'walk2' },
                { key: 'walk3' },
                { key: 'walk4' },
                { key: 'walk5' },
                { key: 'walk6' },
                { key: 'walk7', duration: 8 }
            ],
            frameRate: 8,
            repeat: -1,
            // ease: 'Linear'
        });
    
        this.anims.create({
            key: 'spell',
            frames: [
                { key: 'fart0' },
                { key: 'fart1' },
                { key: 'fart2' },
                { key: 'fart3' },
                { key: 'fart4' },
                { key: 'fart5' },
                { key: 'fart6' },
                { key: 'fart7' },
                { key: 'fart8', duration: 1 }
            ],
            frameRate: 10,
            repeat: -1,
            // ease: 'Linear'
        });
    //SPRITESHEET ANIMATION END




    //TWO TOUCH INPUTS START
    graphics = this.add.graphics();
    this.input.addPointer(3);
    text = this.add.text(10, 10, 'Welcome in my cozy prototype', { font: '16px Courier', fill: '#00ff00' });
    //TWO TOUCH INPUTS END




    //MOVE TO POINTER START
    var blocks = this.physics.add.group({key: 'block', frameQuantity: 0, setXY: { x: 100, y: 400, stepX: 100 }});
    var blue = this.physics.add.sprite(200, 300, 'fart0').setScale(0.15).play('spell');
    var cursor = this.add.image(0, 0, 'cursor').setVisible(false);
    var cursor2 = this.add.image(0, 0, 'cursor').setVisible(false);

    this.input.on('pointermove', function (pointer2)
    {
        cursor2.setVisible(false).setPosition(this.input.pointer2.x, this.input.pointer2.y);

        this.physics.moveToObject(blue, cursor2, 600);

        Phaser.Utils.Array.Each(
            blocks.getChildren(),
            this.physics.moveToObject,
            this.physics,
            cursor, pointer2, 20);
    }, this);
    //MOVE TO POINTER END




    //ROTATE AROUND X Y START
    this.group = this.add.group();

        for (var i = 0; i < 256; i++)
        {
            this.group.create(Phaser.Math.Between(1, 1), Phaser.Math.Between(1, 1), 'diamonds', Phaser.Math.Between(10, 10)).setScale(0.5);
        }

        this.geomPoint = new Phaser.Geom.Point(200, 200);

        this.input.on('pointermove', function () {
            this.geomPoint.setTo(this.input.pointer2.x, this.input.pointer2.y);
        }, this);
    //ROTATE AROUND X Y END




    //MOVE AND STOP START
    this.player = source = this.physics.add.sprite(200, 400, 'walk0').setScale(0.9)
        .play('walk');


    debug = this.add.graphics();

    this.cursors = this.input.on('pointermove', function () {

        target.x = this.input.pointer1.x;
        target.y = this.input.pointer1.y;
        
        this.physics.moveToObject(source, target, 500);

        debug.clear().lineStyle(1, 0x00ff00).setVisible(false);
        debug.lineBetween(0, target.y, 800, target.y);
        debug.lineBetween(target.x, 0, target.x, 600);

    }, this);

    distanceText = this.add.text(0, 0, '', { fill: '#00ff00' }).setVisible(false);
    //MOVE AND STOP END


    //CAMERA FOLLOW
    this.cameras.main.startFollow(this.player);




}



function update (time, delta)
{  

        //TWO TOUCH INPUTS START
    if (this.input.pointer1.isDown || this.input.pointer2.isDown)
    {
        graphics.clear();
    }

    // text.setText([
    //     'pointer1.isDown: ' + this.input.pointer1.isDown,
    //     'pointer2.isDown: ' + this.input.pointer2.isDown,
    // ]);

    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(this.input.pointer1.x, this.input.pointer1.y, 64, 64).setVisible(false);

    graphics.fillStyle(0x00ff00, 1);
    graphics.fillRect(this.input.pointer2.x, this.input.pointer2.y, 64, 64).setVisible(false);
    //TWO TOUCH INPUTS END




    //ROTATE AROUND X Y START
    Phaser.Actions.RotateAroundDistance(this.group.getChildren(), this.geomPoint, 0.055, 75);
    //ROTATE AROUND X Y END




    //MOVE AND STOP START
    var distance = Phaser.Math.Distance.Between(source.x, source.y, target.x, target.y);

    if (source.body.speed > 0)
    {
        distanceText.setText('Distance: ' + distance);

        //  4 is our distance tolerance, i.e. how close the source can get to the target
        //  before it is considered as being there. The faster it moves, the more tolerance is required.
        if (distance < 3)
        {
            source.body.reset(source.x, source.y, target.x, target.y);
        }
    }
    //MOVE AND STOP END


    
    this.iter += 0.02;

}
