import simpleGit from 'simple-git'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

export async function commitChanges(message) {
  try {
    const git = simpleGit(projectRoot)

    await git.add('src/data/')

    const status = await git.status()
    if (status.files.length === 0) {
      return { success: false, message: 'Нет изменений для коммита' }
    }

    const commitMessage = `${message}\n\n[auto-admin] Updated content via admin panel`
    await git.commit(commitMessage)

    // Push to GitHub
    const pushResult = await git.push('origin', 'main')

    return {
      success: true,
      message: 'Изменения успешно закоммичены и отправлены',
      commit: commitMessage,
    }
  } catch (error) {
    console.error('Git error:', error)
    return {
      success: false,
      message: `Ошибка при коммите: ${error.message}`,
    }
  }
}
