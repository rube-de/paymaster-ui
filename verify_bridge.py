from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # Ensure the server is running. If not, this will fail.
        # Assuming server is running at http://localhost:5173 from previous steps or I need to start it?
        # The dev server was started with `yarn dev > dev_output.log 2>&1 &` in previous steps.
        try:
            page.goto("http://localhost:5173", timeout=10000)
        except:
            print("Server not reachable, exiting.")
            return

        page.wait_for_selector("text=Bridge to Sapphire")

        # Verify inputs exist
        assert page.is_visible("text=From")
        assert page.is_visible("text=To")
        assert page.is_visible("input[placeholder='0.00']")

        # Verify button
        assert page.is_visible("button:has-text('Connect Wallet')")

        page.screenshot(path="verification_refactor.png")
        print("Verification successful, screenshot saved to verification_refactor.png")
        browser.close()

if __name__ == "__main__":
    run()
