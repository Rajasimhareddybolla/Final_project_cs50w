from django.test import TestCase
from django.urls import reverse
from selenium import webdriver  
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from .models import User
from selenium.webdriver.common.by import By

# Create your tests here.

class Seleniumtestcases(StaticLiveServerTestCase,TestCase):
    # def setUp(self):
    #     user = User.objects.create_user(username='testuser', password='12345',email="test@gmail.com")
    #     user.save()
    # def test_user_exists(self):
    #     user = User.objects.get(username='testuser')
    #     self.assertEqual(user.username, 'testuser')
        
    #     self.assertTrue(user.check_password('12345')) # as password is encrypted in hash function we have to use check_password method to check the password
    #     self.assertFalse(user.email=='test@gmail.co')
    @classmethod
    def setUp(self):
        self.browser = webdriver.Chrome()
        
        self.user = User.objects.create(username = "raja",password = "raja",email="raja@gmail.com")
        self.user.save()
    @classmethod
    def tearDown(self):
        self.browser.quit()
    def test_login(self):
        
        self.browser.get(self.live_server_url + reverse('login'))  # replace 'login' with the actual name of your login view

        username_input = self.browser.find_element(By.ID,"l_username")  # replace 'username' with the actual name of your username input field
        password_input = self.browser.find_element(By.ID,"l_password")  # replace 'password' with the actual name of your password input field
        username_input.send_keys("Raja")
        password_input.send_keys("Raja")

        self.browser.find_element(By.ID,"login_submit").click()
        self.browser.implicitly_wait(10)
        # Check if after login, it redirects to the correct page (replace 'home' with the name of your home view)
        self.assertEqual(
            
            self.browser.current_url,
            self.live_server_url + reverse('index')
        )