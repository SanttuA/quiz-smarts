import type { SequenceQuestion } from '../../../types'
import {
  seleniumActionsReference,
  seleniumAlertsReference,
  seleniumElementInteractionsReference,
  seleniumFramesReference,
  seleniumIsolationReference,
  seleniumPageObjectsReference,
  seleniumSelectListsReference,
  seleniumTroubleshootingReference,
  seleniumWaitsReference,
  seleniumWindowsReference,
} from './shared'

export const sequenceQuestions = [
  {
    id: 'selenium.sequence.pytest-driver-fixture',
    topicId: 'selenium',
    kind: 'sequence',
    prompt:
      'Arrange a pytest fixture that gives each test a fresh Chrome driver and always quits it.',
    instruction:
      'Import dependencies, declare the fixture, start and provide the browser, then clean it up.',
    items: [
      { id: 'pytest-import', code: 'import pytest' },
      { id: 'selenium-import', code: 'from selenium import webdriver' },
      { id: 'decorator', code: '@pytest.fixture' },
      { id: 'fixture', code: 'def driver():' },
      { id: 'create', code: '    browser = webdriver.Chrome()' },
      { id: 'yield', code: '    yield browser' },
      { id: 'quit', code: '    browser.quit()' },
    ],
    correctOrder: [
      'pytest-import',
      'selenium-import',
      'decorator',
      'fixture',
      'create',
      'yield',
      'quit',
    ],
    acceptedOrders: [
      ['selenium-import', 'pytest-import', 'decorator', 'fixture', 'create', 'yield', 'quit'],
    ],
    explanation:
      'Imports precede the decorated fixture, which creates the browser before yield and resumes afterward to quit it.',
    reference: seleniumIsolationReference,
  },
  {
    id: 'selenium.sequence.form-submission',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a test that replaces a name, submits the form, and verifies the response.',
    instruction: 'Open the form, find and edit the field, submit it, then assert the result.',
    items: [
      { id: 'test', code: 'def test_profile_update(driver):' },
      { id: 'get', code: "    driver.get('https://example.test/profile')" },
      { id: 'field', code: "    name = driver.find_element(By.ID, 'name')" },
      { id: 'clear', code: '    name.clear()' },
      { id: 'type', code: "    name.send_keys('Ada')" },
      { id: 'submit', code: "    driver.find_element(By.ID, 'save').click()" },
      {
        id: 'assert',
        code: "    assert driver.find_element(By.ID, 'message').text == 'Saved'",
      },
    ],
    correctOrder: ['test', 'get', 'field', 'clear', 'type', 'submit', 'assert'],
    explanation:
      'The page and field must exist before editing, the new value precedes submission, and verification follows the action.',
    reference: seleniumElementInteractionsReference,
  },
  {
    id: 'selenium.sequence.synchronized-login',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a login test that waits for navigation without using a fixed sleep.',
    instruction:
      'Open login, enter credentials, submit, wait for the dashboard URL, and verify it.',
    items: [
      { id: 'get', code: "driver.get('https://example.test/login')" },
      {
        id: 'email',
        code: "driver.find_element(By.NAME, 'email').send_keys('ada@example.com')",
      },
      {
        id: 'password',
        code: "driver.find_element(By.NAME, 'password').send_keys('secret')",
      },
      { id: 'submit', code: "driver.find_element(By.ID, 'sign-in').click()" },
      { id: 'wait', code: 'wait = WebDriverWait(driver, 10)' },
      { id: 'condition', code: "wait.until(EC.url_contains('/dashboard'))" },
      { id: 'assert', code: "assert driver.current_url.endswith('/dashboard')" },
    ],
    correctOrder: ['get', 'email', 'password', 'submit', 'wait', 'condition', 'assert'],
    acceptedOrders: [
      ['wait', 'get', 'email', 'password', 'submit', 'condition', 'assert'],
      ['get', 'wait', 'email', 'password', 'submit', 'condition', 'assert'],
      ['get', 'email', 'wait', 'password', 'submit', 'condition', 'assert'],
      ['get', 'email', 'password', 'wait', 'submit', 'condition', 'assert'],
    ],
    explanation:
      'The wait may be initialized at any point before it is used; its URL condition must run after submission and before the final assertion.',
    reference: seleniumWaitsReference,
  },
  {
    id: 'selenium.sequence.select-country',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a test that chooses Finland from a native country dropdown.',
    instruction:
      'Import Select, load the page, wrap the element, select the option, and verify it.',
    items: [
      { id: 'import', code: 'from selenium.webdriver.support.ui import Select' },
      { id: 'get', code: "driver.get('https://example.test/settings')" },
      {
        id: 'select',
        code: "country = Select(driver.find_element(By.ID, 'country'))",
      },
      { id: 'choose', code: "country.select_by_visible_text('Finland')" },
      { id: 'assert', code: "assert country.first_selected_option.text == 'Finland'" },
    ],
    correctOrder: ['import', 'get', 'select', 'choose', 'assert'],
    explanation:
      'Select must be imported and the page loaded before wrapping the dropdown, choosing its option, and checking the selection.',
    reference: seleniumSelectListsReference,
  },
  {
    id: 'selenium.sequence.iframe-form',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a flow that fills a field inside an iframe and returns to the main page.',
    instruction:
      'Load the page, locate and enter the frame, interact inside it, then restore the top-level document.',
    items: [
      { id: 'get', code: "driver.get('https://example.test/checkout')" },
      { id: 'frame', code: "frame = driver.find_element(By.ID, 'payment-frame')" },
      { id: 'switch', code: 'driver.switch_to.frame(frame)' },
      { id: 'field', code: "card = driver.find_element(By.NAME, 'card-number')" },
      { id: 'type', code: "card.send_keys('4242424242424242')" },
      { id: 'return', code: 'driver.switch_to.default_content()' },
    ],
    correctOrder: ['get', 'frame', 'switch', 'field', 'type', 'return'],
    explanation:
      'WebDriver can locate the inner field only after switching into its iframe and must switch back before using the main document.',
    reference: seleniumFramesReference,
  },
  {
    id: 'selenium.sequence.new-window',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a flow that opens a new tab and switches WebDriver to it safely.',
    instruction:
      'Save the original handle, open the tab, wait for it, identify its handle, and switch.',
    items: [
      { id: 'original', code: 'original = driver.current_window_handle' },
      { id: 'open', code: "driver.find_element(By.LINK_TEXT, 'Open details').click()" },
      { id: 'wait', code: 'WebDriverWait(driver, 10).until(EC.number_of_windows_to_be(2))' },
      {
        id: 'new',
        code: 'new_handle = next(handle for handle in driver.window_handles if handle != original)',
      },
      { id: 'switch', code: 'driver.switch_to.window(new_handle)' },
      { id: 'assert', code: "assert driver.title == 'Details'" },
    ],
    correctOrder: ['original', 'open', 'wait', 'new', 'switch', 'assert'],
    explanation:
      'The original handle establishes a comparison, and waiting for two handles ensures the new one exists before switching and asserting.',
    reference: seleniumWindowsReference,
  },
  {
    id: 'selenium.sequence.confirm-alert',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a flow that accepts a confirmation alert and verifies its text.',
    instruction:
      'Trigger the dialog, wait for it, capture its message, accept it, and then assert the captured text.',
    items: [
      { id: 'click', code: "driver.find_element(By.ID, 'delete').click()" },
      { id: 'wait', code: 'alert = WebDriverWait(driver, 10).until(EC.alert_is_present())' },
      { id: 'text', code: 'message = alert.text' },
      { id: 'accept', code: 'alert.accept()' },
      { id: 'assert', code: "assert message == 'Delete this item?'" },
    ],
    correctOrder: ['click', 'wait', 'text', 'accept', 'assert'],
    explanation:
      'The action creates the alert, the wait obtains it, and its text must be saved before accepting closes the dialog.',
    reference: seleniumAlertsReference,
  },
  {
    id: 'selenium.sequence.hover-menu',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a hover-and-click interaction using ActionChains.',
    instruction:
      'Import the API, load and locate the menu controls, perform the chain, then verify navigation.',
    items: [
      { id: 'import', code: 'from selenium.webdriver.common.action_chains import ActionChains' },
      { id: 'get', code: "driver.get('https://example.test')" },
      { id: 'menu', code: "menu = driver.find_element(By.ID, 'products-menu')" },
      { id: 'item', code: "item = driver.find_element(By.LINK_TEXT, 'Laptops')" },
      {
        id: 'perform',
        code: 'ActionChains(driver).move_to_element(menu).click(item).perform()',
      },
      { id: 'assert', code: "assert driver.current_url.endswith('/laptops')" },
    ],
    correctOrder: ['import', 'get', 'menu', 'item', 'perform', 'assert'],
    explanation:
      'The action API and elements must be available before the chain can hover, click, and enable verification of the result.',
    reference: seleniumActionsReference,
  },
  {
    id: 'selenium.sequence.login-page-object',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a small page object and a test that uses its login service.',
    instruction:
      'Define the page structure and service before constructing it in the behavioral test.',
    items: [
      { id: 'class', code: 'class LoginPage:' },
      { id: 'locator', code: "    EMAIL = (By.NAME, 'email')" },
      { id: 'init', code: '    def __init__(self, driver):' },
      { id: 'driver', code: '        self.driver = driver' },
      {
        id: 'method',
        code: '    def enter_email(self, value):\n        self.driver.find_element(*self.EMAIL).send_keys(value)',
      },
      {
        id: 'service',
        code: "    def email_value(self):\n        return self.driver.find_element(*self.EMAIL).get_attribute('value')",
      },
      { id: 'test', code: 'def test_login_form(driver):' },
      { id: 'create', code: '    page = LoginPage(driver)' },
      { id: 'use', code: "    page.enter_email('ada@example.com')" },
      {
        id: 'assert',
        code: "    assert page.email_value() == 'ada@example.com'",
      },
    ],
    correctOrder: [
      'class',
      'locator',
      'init',
      'driver',
      'method',
      'service',
      'test',
      'create',
      'use',
      'assert',
    ],
    explanation:
      'The page object encapsulates its locator and interaction before the test uses that service and owns the behavioral assertion.',
    reference: seleniumPageObjectsReference,
  },
  {
    id: 'selenium.sequence.stale-element-recovery',
    topicId: 'selenium',
    kind: 'sequence',
    prompt: 'Arrange a safe recovery flow when an update replaces the Save button in the DOM.',
    instruction:
      'Keep the old reference, trigger replacement, wait for staleness, find the new button, and interact with it.',
    items: [
      { id: 'old', code: "old_button = driver.find_element(By.ID, 'save')" },
      { id: 'update', code: "driver.find_element(By.ID, 'refresh-form').click()" },
      { id: 'stale', code: 'wait.until(EC.staleness_of(old_button))' },
      {
        id: 'fresh',
        code: "fresh_button = wait.until(EC.element_to_be_clickable((By.ID, 'save')))",
      },
      { id: 'click', code: 'fresh_button.click()' },
    ],
    correctOrder: ['old', 'update', 'stale', 'fresh', 'click'],
    explanation:
      'The DOM update invalidates the old reference, so the test waits for that state and obtains a fresh interactable element before clicking.',
    reference: seleniumTroubleshootingReference,
  },
] as const satisfies readonly SequenceQuestion[]
