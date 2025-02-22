from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

def test_login_success():
    driver = webdriver.Chrome() 
    driver.get("https://www.saucedemo.com/")

    # Login
    driver.find_element(By.ID, "user-name").send_keys("standard_user")
    driver.find_element(By.ID, "password").send_keys("secret_sauce")
    driver.find_element(By.ID, "login-button").click()
    time.sleep(2)

    # Validasi berhasil login
    assert "inventory.html" in driver.current_url

    driver.quit()

def test_add_item_to_cart():
    driver = webdriver.Chrome()
    driver.get("https://www.saucedemo.com/")

    # Login
    driver.find_element(By.ID, "user-name").send_keys("standard_user")
    driver.find_element(By.ID, "password").send_keys("secret_sauce")
    driver.find_element(By.ID, "login-button").click()
    time.sleep(2)

    # Tambah item ke cart
    driver.find_element(By.CLASS_NAME, "btn_inventory").click()
    time.sleep(1)

    # Validasi item ada di cart
    cart_badge = driver.find_element(By.CLASS_NAME, "shopping_cart_badge").text
    assert cart_badge == "1"

    driver.quit()