import * as readline from 'readline'
import * as fs from 'fs'
import * as path from 'path'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function prompt(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer)
    })
  })
}

async function main() {
  // Take input for the location of the files on the folder
  const folderPath = await prompt('Enter the path of the folder with the files to rename: ')

  // Take input for the text file with all the names which will be used to rename all the files.
  const namesFilePath = await prompt('Enter the path of the text file containing the new names: ')

  // Read the new names from the text file
  const newNames = fs.readFileSync(namesFilePath, 'utf-8').split('\n').map(name => name.trim())

  // Check if the number of new names matches the number of files in the directory
  const filesInFolder = await fs.promises.readdir(folderPath)
  if (newNames.length !== filesInFolder.length) {
    console.log('Error: The number of new names in the text file does not match the number of files in the folder.')
    return
  }

  // Preview the renamed files
  console.log('Preview of renamed files:')
  filesInFolder.forEach((filename, i) => {
    // Get the file extension
    const ext = path.extname(filename)
    // Construct the new filename with incrementing numbers
    const newFilename = `${(i + 1).toString().padStart(3, '0')}_${newNames[i]}${ext}`
    // Print the preview
    console.log(`${filename} -> ${newFilename}`)
  })

  // Check for conflicts
  const conflicts: [string, string][] = []
  filesInFolder.forEach((filename, i) => {
    // Get the file extension
    const ext = path.extname(filename)
    // Construct the new filename with incrementing numbers
    const newFilename = `${(i + 1).toString().padStart(3, '0')}_${newNames[i]}${ext}`
    // Check if the new filename already exists in the directory
    if (fs.existsSync(path.join(folderPath, newFilename))) {
      conflicts.push([filename, newFilename])
    }
  })

  // Show conflicts if any
  if (conflicts.length > 0) {
    console.log('Conflicts detected:')
    conflicts.forEach(conflict => {
      console.log(`${conflict[0]} -> ${conflict[1]}`)
    })
  }

  // Confirm with the user if they want to proceed with renaming
  const confirmation = await prompt('Do you want to proceed with renaming? (y/n): ')
  if (confirmation.toLowerCase() !== 'y') {
    return
  }

  // Rename all the files
  for (let i = 0; i < filesInFolder.length; i++) {
    const filename = filesInFolder[i]
    // Get the file extension
    const ext = path.extname(filename)
    // Construct the new filename with incrementing numbers
    const newFilename = `${(i + 1).toString().padStart(3, '0')}_${newNames[i]}${ext}`
    // Rename the file
    await fs.promises.rename(path.join(folderPath, filename), path.join(folderPath, newFilename))
  }

  // Success message
  console.log('Files successfully renamed.')
  // Open the renamed folder
  const childProcess = require('child_process')
  childProcess.exec(`open "${folderPath}"`)
}

main()