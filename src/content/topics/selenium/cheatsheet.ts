import type { CheatSheetSection } from '../../types'

export const seleniumCheatSheet = [
  {
    id: 'setup-sessions-lifecycle',
    title: 'Setup, sessions, and lifecycle',
    summary:
      'Start an isolated browser session, navigate with it, and always release its resources.',
    items: [
      {
        term: 'Install the binding',
        detail: 'Install the Selenium Python package in the environment that will run the tests.',
        code: 'python -m pip install selenium',
      },
      {
        term: 'WebDriver imports',
        detail: 'Import webdriver for sessions and By for explicit locator strategies.',
        code: 'from selenium import webdriver\nfrom selenium.webdriver.common.by import By',
      },
      {
        term: 'Start Chrome',
        detail:
          'Creating a Chrome WebDriver starts a browser session; Selenium Manager resolves the driver when needed.',
        code: 'driver = webdriver.Chrome()',
      },
      {
        term: 'Navigate and inspect',
        detail:
          'Use get to navigate, then read observable browser state such as title or current_url.',
        code: "driver.get('https://example.com')\nassert driver.title == 'Example Domain'",
      },
      {
        term: 'pytest fixture',
        detail:
          'A yielding fixture gives each test its own driver and reserves the code after yield for cleanup.',
        code: '@pytest.fixture\ndef driver():\n    browser = webdriver.Chrome()\n    yield browser\n    browser.quit()',
      },
      {
        term: 'Quit every session',
        detail:
          'Call quit even after a failed test so every window closes and the driver process is released.',
        code: 'driver.quit()',
      },
    ],
  },
  {
    id: 'locators-finders',
    title: 'Locators and element finding',
    summary:
      'Describe stable elements clearly and choose the finder that matches the expected result.',
    items: [
      {
        term: 'Unique ID',
        detail: 'Prefer a unique, predictable HTML id when the application provides one.',
        code: "driver.find_element(By.ID, 'email')",
      },
      {
        term: 'Compact CSS',
        detail: 'Use a readable CSS selector when no suitable unique ID is available.',
        code: `driver.find_element(By.CSS_SELECTOR, '[data-testid="save"]')`,
      },
      {
        term: 'One match',
        detail:
          'find_element returns the first match and raises NoSuchElementException when nothing matches.',
        code: "button = driver.find_element(By.NAME, 'submit')",
      },
      {
        term: 'All matches',
        detail:
          'find_elements returns every matching element, or an empty list when there are no matches.',
        code: "rows = driver.find_elements(By.CSS_SELECTOR, 'table tbody tr')",
      },
      {
        term: 'Scoped search',
        detail:
          'Find a stable container first, then search within that element to reduce ambiguity.',
        code: "form = driver.find_element(By.ID, 'login')\nform.find_element(By.NAME, 'password')",
      },
      {
        term: 'Reusable locator',
        detail: 'Store a locator tuple when tests, waits, or page objects need the same target.',
        code: `SAVE_BUTTON = (By.CSS_SELECTOR, '[data-testid="save"]')`,
      },
    ],
  },
  {
    id: 'elements-interactions-assertions',
    title: 'Elements, interactions, and assertions',
    summary: 'Perform user-like actions and verify observable browser or element state.',
    items: [
      {
        term: 'Enter text',
        detail: 'send_keys types into a keyboard-interactable element such as a text field.',
        code: "driver.find_element(By.NAME, 'email').send_keys('ada@example.com')",
      },
      {
        term: 'Clear a field',
        detail: 'Call clear before entering replacement text into an editable field.',
        code: "field.clear()\nfield.send_keys('updated value')",
      },
      {
        term: 'Click',
        detail:
          'click scrolls an element into view and requires an interactable target whose center is not obscured.',
        code: 'submit_button.click()',
      },
      {
        term: 'Native select',
        detail:
          'Wrap a native select element with Select to choose an option by visible text or value.',
        code: "Select(driver.find_element(By.ID, 'country')).select_by_visible_text('Finland')",
      },
      {
        term: 'Read state',
        detail:
          'Inspect text, attributes, selection, visibility, or enabled state after an interaction.',
        code: "message = driver.find_element(By.ID, 'message')\nassert message.text == 'Saved'",
      },
      {
        term: 'Assertions stay in tests',
        detail:
          'Use plain pytest assertions to express the behavior the test is responsible for verifying.',
        code: "assert driver.current_url.endswith('/dashboard')",
      },
    ],
  },
  {
    id: 'waits-synchronization',
    title: 'Waits and synchronization',
    summary:
      'Wait for the exact state the application needs instead of guessing how long it takes.',
    items: [
      {
        term: 'Explicit wait',
        detail:
          'WebDriverWait polls a specific condition until it succeeds or reaches its timeout.',
        code: 'wait = WebDriverWait(driver, 10)',
      },
      {
        term: 'Expected condition',
        detail: 'Use an expected condition that describes the required element or browser state.',
        code: "status = wait.until(EC.visibility_of_element_located((By.ID, 'status')))",
      },
      {
        term: 'Clickable target',
        detail: 'Wait for a target to be visible and enabled before clicking dynamic controls.',
        code: "wait.until(EC.element_to_be_clickable((By.ID, 'save'))).click()",
      },
      {
        term: 'Implicit wait',
        detail:
          'An implicit wait applies globally to element-location calls for the rest of the driver session.',
        code: 'driver.implicitly_wait(2)',
      },
      {
        term: 'Do not mix waits',
        detail:
          'Combining implicit and explicit waits can produce unpredictable total wait times; choose one strategy consistently.',
      },
      {
        term: 'Avoid fixed sleeps',
        detail:
          'A fixed sleep neither describes the desired state nor finishes early, so prefer a targeted wait condition.',
        code: "wait.until(EC.url_contains('/dashboard'))",
      },
    ],
  },
  {
    id: 'browser-state-advanced-input',
    title: 'Browser state and advanced input',
    summary:
      'Switch to the correct browsing context and use richer input only when basic actions are insufficient.',
    items: [
      {
        term: 'Enter a frame',
        detail: 'Switch into an iframe before locating elements inside its document.',
        code: "frame = driver.find_element(By.ID, 'payment-frame')\ndriver.switch_to.frame(frame)",
      },
      {
        term: 'Return to the page',
        detail: 'Switch back to the top-level document after finishing work inside a frame.',
        code: 'driver.switch_to.default_content()',
      },
      {
        term: 'Handle an alert',
        detail: 'Switch to a JavaScript alert, inspect it if needed, then accept or dismiss it.',
        code: 'alert = driver.switch_to.alert\nalert.accept()',
      },
      {
        term: 'Switch windows',
        detail: 'Save the original handle, wait for another window, then switch by its handle.',
        code: 'original = driver.current_window_handle\ndriver.switch_to.window(new_handle)',
      },
      {
        term: 'Action chains',
        detail:
          'Build coordinated mouse and keyboard input with ActionChains and execute it with perform.',
        code: 'ActionChains(driver).move_to_element(menu).click(item).perform()',
      },
      {
        term: 'Keyboard input',
        detail: 'Use Keys constants for special keys such as Enter, Escape, or modifier chords.',
        code: "search.send_keys('Selenium', Keys.ENTER)",
      },
    ],
  },
  {
    id: 'maintainability-troubleshooting',
    title: 'Maintainability and troubleshooting',
    summary:
      'Keep tests independent, hide page structure, and diagnose failures from current browser state.',
    items: [
      {
        term: 'Isolated tests',
        detail:
          'Create a fresh WebDriver per test so cookies, windows, and prior failures do not leak state.',
      },
      {
        term: 'Page objects',
        detail:
          'Keep locators and page-specific interactions behind methods that describe user-facing services.',
        code: "login_page.sign_in('ada@example.com', 'secret')",
      },
      {
        term: 'Tests own assertions',
        detail:
          'Page objects may verify that they loaded, but behavioral assertions normally belong in the test.',
      },
      {
        term: 'Fresh element references',
        detail:
          'After the DOM replaces an element, wait for the new state and locate it again instead of reusing a stale reference.',
        code: "save = wait.until(EC.element_to_be_clickable((By.ID, 'save')))",
      },
      {
        term: 'Compare browsers',
        detail:
          'Reproduce a failure in another supported browser to distinguish application behavior from a driver-specific issue.',
      },
      {
        term: 'Inspect the cause',
        detail:
          'Check the current URL, locator, timing, screenshot, page source, and Selenium logs before changing a test.',
      },
    ],
  },
] as const satisfies readonly CheatSheetSection[]
