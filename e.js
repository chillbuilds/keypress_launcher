import {GlobalKeyboardListener} from 'node-global-key-listener'
import { spawn } from 'child_process'
import processWindows from 'node-process-windows'
const v = new GlobalKeyboardListener()

let sequenceArr = ['QWERTY', 'ASDF', 'BOOB']
let sequenceIndex;
let letterCheck = 0
let activeEntry = false

let launchProgram = (trigger) => {
    let program;
    switch(trigger) {
        case 'QWERTY':
          program = 'notepad.exe'
          console.log('launching notepad')
          break;
        case 'ASDF':
          program = 'C:/Program Files (x86)/Adobe/Adobe Flash CS6/Flash.exe'
          console.log('launching flash')
          break;
        case 'BOOB':
          program = 'C:/Program Files (x86)/Steam/steamapps/common/Enter the Gungeon/EtG.exe'
          console.log('launching enter the gungeon')
          break;
        default:
          // code block
      }
    const childProcess = spawn(program, [], {
        detached: true,
        stdio: 'ignore'
      })
    childProcess.on('error', (err) => {
        console.error('Error occurred:', err)
    })

    var activeProcesses = processWindows.getProcesses(function(err, processes) {
        var chromeProcesses = processes.filter(p => p.processName.indexOf("flash") >= 0)

        if(chromeProcesses.length > 0) {
            processWindows.focusWindow(chromeProcesses[0])
        }
    })
}

v.addListener(function (key, down) {
    if(key.scanCode == 192){
        activeEntry = true
    }
    if(key.state == 'DOWN' && activeEntry == true){
        let keycode = String.fromCharCode(key.scanCode)
        if(sequenceIndex == undefined){
            for(let i = 0; i < sequenceArr.length; i++){
                let sequenceItem = sequenceArr[i].split('')
                if(keycode == sequenceItem[letterCheck]){
                    sequenceIndex = i
                }
            }
        }
        if(sequenceIndex != undefined){
        let keyword = sequenceArr[sequenceIndex].split('')
        if(keycode == keyword[letterCheck]){
            console.log('letter check: ', letterCheck)
            letterCheck++
            if(letterCheck == keyword.length){
                letterCheck = 0
                launchProgram(sequenceArr[sequenceIndex])
                sequenceIndex = undefined
                activeEntry = false
            }
        }else{
            letterCheck = 0
            console.log('reset')
            sequenceIndex = undefined
            activeEntry = false
        }
        }
    }
})