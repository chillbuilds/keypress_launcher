import {GlobalKeyboardListener} from 'node-global-key-listener'
import { spawn } from 'child_process'
import processWindows from 'node-process-windows'
const v = new GlobalKeyboardListener()

let sequenceArr = 'QWERTY'.split('')
let letterCheck = 0

let launchProgram = () => {
    const childProcess = spawn('C:/Program Files (x86)/Steam/steamapps/common/Enter the Gungeon/EtG.exe', [], {
        detached: true, // Detach the child process from the parent
        stdio: 'ignore' // Ignore standard input/output/error streams
      })
    childProcess.on('error', (err) => {
        console.error('Error occurred:', err)
    })

    var activeProcesses = processWindows.getProcesses(function(err, processes) {
        var chromeProcesses = processes.filter(p => p.processName.indexOf("flash") >= 0);
 
        // If there is a chrome process active, focus the first window
        if(chromeProcesses.length > 0) {
            processWindows.focusWindow(chromeProcesses[0]);
        }
    })
}

v.addListener(function (key, down) {
    if(key.state == 'DOWN'){
        let keycode = String.fromCharCode(key.scanCode)
        if(keycode == sequenceArr[letterCheck]){
            letterCheck++
            console.log('letter check: ' + letterCheck)
            if(letterCheck == sequenceArr.length){
                console.log('done')
                letterCheck = 0
                launchProgram()
            }
        }else{
            letterCheck = 0
            console.log('letter check: ' + letterCheck)

        }
    }
})