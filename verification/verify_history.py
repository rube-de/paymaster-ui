from playwright.sync_api import Page, expect, sync_playwright
import os

def test_history_dialog(page: Page):
    # 1. Go to the app
    page.goto("http://localhost:5173/")

    # 2. Wait for page load
    expect(page.get_by_role("heading", name="Bridge").first).to_be_visible()

    # 3. Find the history button
    history_btn = page.get_by_role("button", name="Transaction History")
    expect(history_btn).to_be_visible()

    # 4. Click it
    history_btn.click()

    # 5. Check dialog content
    expect(page.get_by_role("heading", name="Transaction History")).to_be_visible()
    expect(page.get_by_text("Your recent bridge transactions")).to_be_visible()
    expect(page.get_by_text("No transactions found")).to_be_visible()

    # 6. Screenshot
    # Use relative path or absolute path based on CWD
    cwd = os.getcwd()
    path = os.path.join(cwd, "verification/history_dialog.png")
    print(f"Saving screenshot to {path}")
    page.screenshot(path=path)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_history_dialog(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
