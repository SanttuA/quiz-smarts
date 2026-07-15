import type { MultipleChoiceQuestion } from '../../../types'
import {
  seleniumElementInteractionsReference,
  seleniumFindersReference,
  seleniumFirstScriptReference,
  seleniumFramesReference,
  seleniumLocatorsReference,
  seleniumPageObjectsReference,
  seleniumWaitsReference,
  seleniumWindowsReference,
} from './shared'

export const multipleChoiceQuestions = [
  {
    id: 'selenium.mcq.webdriver-session',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'What does webdriver.Chrome() create for a Selenium test?',
    instruction: 'Choose the browser resource controlled by WebDriver.',
    choices: [
      { id: 'session', label: 'A new Chrome browser session' },
      { id: 'server', label: 'A deployed application server' },
      { id: 'database', label: 'An isolated test database' },
      { id: 'report', label: 'A completed pytest report' },
    ],
    correctChoiceId: 'session',
    explanation:
      'webdriver.Chrome starts a WebDriver session connected to a Chrome browser that Selenium commands can control.',
    reference: seleniumFirstScriptReference,
  },
  {
    id: 'selenium.mcq.quit-cleanup',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'Which cleanup call closes every window and ends the WebDriver session?',
    instruction: 'Choose the complete session-cleanup method.',
    choices: [
      { id: 'quit', label: 'driver.quit()', code: 'driver.quit()' },
      { id: 'close', label: 'driver.close()', code: 'driver.close()' },
      { id: 'stop', label: 'driver.stop()', code: 'driver.stop()' },
      { id: 'clear', label: 'driver.clear()', code: 'driver.clear()' },
    ],
    correctChoiceId: 'quit',
    explanation:
      'driver.quit closes all windows associated with the session and releases the browser and driver processes.',
    reference: seleniumFirstScriptReference,
  },
  {
    id: 'selenium.mcq.stable-locator',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'Which locator best targets a stable element whose unique id is save-button?',
    instruction: 'Choose the compact locator that uses the unique application contract.',
    choices: [
      {
        id: 'id',
        label: "driver.find_element(By.ID, 'save-button')",
        code: "driver.find_element(By.ID, 'save-button')",
      },
      {
        id: 'xpath',
        label: "driver.find_element(By.XPATH, '/html/body/div[3]/button')",
        code: "driver.find_element(By.XPATH, '/html/body/div[3]/button')",
      },
      {
        id: 'tag',
        label: "driver.find_element(By.TAG_NAME, 'button')",
        code: "driver.find_element(By.TAG_NAME, 'button')",
      },
      {
        id: 'class',
        label: "driver.find_element(By.CLASS_NAME, 'blue')",
        code: "driver.find_element(By.CLASS_NAME, 'blue')",
      },
    ],
    correctChoiceId: 'id',
    explanation:
      'A unique and predictable HTML id is compact, readable, and less coupled to layout or styling than the alternatives.',
    reference: seleniumLocatorsReference,
  },
  {
    id: 'selenium.mcq.find-elements-empty',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'What does find_elements return when no elements match its locator?',
    instruction: 'Choose the plural finder behavior.',
    choices: [
      { id: 'empty', label: 'An empty list' },
      { id: 'none', label: 'None' },
      { id: 'exception', label: 'NoSuchElementException' },
      { id: 'placeholder', label: 'A placeholder WebElement' },
    ],
    correctChoiceId: 'empty',
    explanation:
      'The plural find_elements method returns a list of all matches, and that list is empty when nothing matches.',
    reference: seleniumFindersReference,
  },
  {
    id: 'selenium.mcq.explicit-wait',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'Why is an explicit wait appropriate for a status message loaded asynchronously?',
    instruction: 'Choose the synchronization behavior of WebDriverWait.',
    choices: [
      { id: 'poll', label: 'It polls a specific condition until success or timeout' },
      { id: 'sleep', label: 'It always pauses for the entire timeout' },
      { id: 'mock', label: 'It replaces the asynchronous response' },
      { id: 'reload', label: 'It continuously reloads the page' },
    ],
    correctChoiceId: 'poll',
    explanation:
      'An explicit wait repeatedly evaluates its requested condition and continues as soon as that condition succeeds.',
    reference: seleniumWaitsReference,
  },
  {
    id: 'selenium.mcq.mixed-waits',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'Why should a suite avoid combining implicit and explicit waits?',
    instruction: 'Choose the documented timing risk.',
    choices: [
      { id: 'unpredictable', label: 'Their interaction can cause unpredictable total wait times' },
      { id: 'unsupported', label: 'Python cannot import both APIs in one module' },
      { id: 'browser', label: 'Implicit waits work only in Firefox' },
      { id: 'assertions', label: 'Explicit waits disable pytest assertions' },
    ],
    correctChoiceId: 'unpredictable',
    explanation:
      'An implicit wait affects the element lookups performed inside an explicit wait, which can extend timing unexpectedly.',
    reference: seleniumWaitsReference,
  },
  {
    id: 'selenium.mcq.click-obscured',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'What can happen when another element obscures the center of a button?',
    instruction: 'Choose the relevant WebDriver interaction result.',
    choices: [
      { id: 'intercepted', label: 'The click can fail with an element-click-intercepted error' },
      { id: 'bypass', label: 'WebDriver automatically removes the covering element' },
      { id: 'hidden-click', label: 'WebDriver clicks the hidden button without validation' },
      { id: 'refresh', label: 'The browser refreshes and retries the click indefinitely' },
    ],
    correctChoiceId: 'intercepted',
    explanation:
      'WebDriver clicks an element at its center and reports an intercepted click when another element receives that point.',
    reference: seleniumElementInteractionsReference,
  },
  {
    id: 'selenium.mcq.frame-context',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'What must a test do before locating a field inside an iframe?',
    instruction: 'Choose the required browsing-context operation.',
    choices: [
      { id: 'switch', label: 'Switch WebDriver into the frame' },
      { id: 'refresh', label: 'Refresh the top-level page' },
      { id: 'cookie', label: 'Copy cookies into the iframe' },
      { id: 'script', label: 'Disable JavaScript in the frame' },
    ],
    correctChoiceId: 'switch',
    explanation:
      'Elements inside an iframe belong to another document, so WebDriver must switch into that frame before finding them.',
    reference: seleniumFramesReference,
  },
  {
    id: 'selenium.mcq.window-handle',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'How does WebDriver move control to a newly opened tab?',
    instruction: 'Choose the operation that targets the new browsing context.',
    choices: [
      { id: 'handle', label: 'Pass the new window handle to driver.switch_to.window' },
      { id: 'index', label: 'Assign the tab number to driver.current_url' },
      { id: 'refresh', label: 'Refresh until the new tab becomes active automatically' },
      { id: 'frame', label: 'Pass the tab element to driver.switch_to.frame' },
    ],
    correctChoiceId: 'handle',
    explanation:
      'Each window or tab has a handle, and switch_to.window changes WebDriver control to the handle supplied.',
    reference: seleniumWindowsReference,
  },
  {
    id: 'selenium.mcq.page-object-assertions',
    topicId: 'selenium',
    kind: 'multiple-choice',
    prompt: 'Where should behavioral assertions normally live when using page objects?',
    instruction: 'Choose the responsibility recommended by Selenium test practices.',
    choices: [
      { id: 'test', label: 'In the test that specifies the expected behavior' },
      { id: 'constructor', label: 'Only in every page-object constructor' },
      { id: 'locator', label: 'Inside the locator constants' },
      { id: 'driver', label: 'Inside the WebDriver implementation' },
    ],
    correctChoiceId: 'test',
    explanation:
      'Page objects model page services and structure, while the test remains responsible for behavioral verification.',
    reference: seleniumPageObjectsReference,
  },
] as const satisfies readonly MultipleChoiceQuestion[]
