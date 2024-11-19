import Boot from './Scenes/Boot';
import LoadingScene from './Scenes/LoadingScene';
import MainMenu from './Scenes/MainMenu';
import { AUTO, Game } from 'phaser';
import UIScene from './Scenes/UIScene';
import LevelScene from './Scenes/LevelScene';
import PlayGameScene from './Scenes/PlayGameScene';
import ResultScene from './Scenes/ResultScene';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 700,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#FFFFFF',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            // debug: true,
            // debugShowVelocity: false
        }
    },
    scene: [
        Boot,
        MainMenu,
        PlayGameScene,
        LoadingScene,
        LevelScene,
        UIScene,
        ResultScene,

        
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;