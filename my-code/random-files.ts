import * as os from 'os'
import * as fs from 'fs'
import * as path from 'path'
import * as crypto from 'crypto'

function prompt(question: string): Promise<string> {
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	})

	return new Promise(resolve => {
		readline.question(question + '\n', answer => {
			readline.close()
			resolve(answer.trim())
		})
	})
}

async function main() {
	try {
		const numFiles = parseInt(await prompt('How many files do you want to create?'))

		if (isNaN(numFiles) || numFiles < 1) {
			throw new Error('Invalid number of files')
		}

		const dirPath = path.join(os.homedir(), 'RandomFiles')
		await fs.promises.mkdir(dirPath)

		for (let i = 0; i < numFiles; i++) {
			const name = crypto.randomBytes(5).toString('hex')
			const filename = `File_${i.toString().padStart(2, '0')}.txt`
			const filePath = path.join(dirPath, filename)

			const text = crypto.randomBytes(25).toString('hex')
			await fs.promises.writeFile(filePath, text)
		}

		const files = await fs.promises.readdir(dirPath)
		if (files.length !== numFiles) {
			throw new Error('Failed to create all files')
		}

		console.log(`Created ${numFiles} files in ${dirPath}`)
	} catch (error) {
		console.error(`Error creating files: ${error.message}`)
	}
}
main()
