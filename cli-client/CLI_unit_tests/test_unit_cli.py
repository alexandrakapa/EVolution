from cli_test import login, logout, healthcheck, reset, sessions_per_point, sessions_per_station, sessions_per_ev, sessions_per_provider, admin_actions
import click
import subprocess
import json
import requests
import unittest
from mock import MagicMock, Mock, patch


myStatus={}
myStatus['status'] = 'OK'

fakeToken={}
fakeToken['token'] = '12345'

class TestUnit (unittest.TestCase):

    def test_login(self):
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 200)
            mocked_post.return_value.json.return_value = fakeToken
            self.assertEqual(login('organicfrog305', 'gilles'), 200)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_logout(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 200)
            mocked_post.return_value.json.return_value = fakeToken
            self.assertEqual(logout(), 404)


    def test_healthcheck(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 200)
            mocked_get.return_value.json.return_value = myStatus
            self.assertEqual(healthcheck(), 200)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()


    def test_resetsessions(self):
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 200)
            mocked_post.return_value.json.return_value = myStatus
            self.assertEqual(reset(), 200)


    def test_sessions_per_point(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 200)
            mocked_get.return_value.json.return_value = 0
            self.assertEqual(sessions_per_point('CA-3132-39-123-23', '20080202', '20210101'), 200)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_sessions_per_station(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 200)
            mocked_get.return_value.json.return_value = 0
            self.assertEqual(sessions_per_station('2-39-129-17', '20080202', '20201010'), 200)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_sessions_per_ev(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 200)
            mocked_get.return_value.json.return_value = 0
            self.assertEqual(sessions_per_station('059c028d-b2a6-4a8d-947a-158c7537b290', '20080202', '20201010'), 200)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_sessions_per_provider(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 200)
            mocked_get.return_value.json.return_value = 0
            self.assertEqual(sessions_per_station('1', '20080202', '20201010'), 200)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_admin_actions_users(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 200)
            mocked_get.return_value.json.return_value = fakeToken
            self.assertEqual(admin_actions(users = 'browntiger776'), [200, 0])
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

#    def test_admin_actions_sessionsupd(self):
#        with patch.object(requests, 'post') as mocked_login:
#            mocked_login.return_value = Mock(status_code = 200)
#            mocked_login.return_value.json.return_value = fakeToken
#            login('organicfrog305', 'gilles')
#        with patch.object(requests, 'post') as mocked_post:
#            mocked_post.return_value = Mock(status_code = 200)
#            mocked_post.return_value.json.return_value = fakeToken
#            self.assertEqual(admin_actions(sessionsupd = 'test.csv'), [200, 1])
#        with patch.object(requests, 'post') as mocked_logout:
#            mocked_logout.return_value = Mock(status_code = 200)
#            mocked_logout.return_value.json.return_value = fakeToken
#            logout()


#Make many tests like that
    # def test_admin_actions_usermod(self):
    #     with patch.object(requests, 'post') as mocked_login:
    #         mocked_login.return_value = Mock(status_code = 200)
    #         mocked_login.return_value.json.return_value = fakeToken
    #         login('organicfrog305', 'gilles')
    #     with patch.object(requests, 'post') as mocked_post:
    #         mocked_post.return_value = Mock(status_code = 200)
    #         mocked_post.return_value.json.return_value = fakeToken
    #         self.assertEqual(admin_actions(usermod = ' ', username = 'browntiger776', passw = 'maker'), [200, 2])
    #     with patch.object(requests, 'post') as mocked_logout:
    #         mocked_logout.return_value = Mock(status_code = 200)
    #         mocked_logout.return_value.json.return_value = fakeToken
    #         logout()

    def test_admin_actions_invalid_combination1(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 404)
            mocked_post.return_value.json.return_value = fakeToken
            self.assertEqual(admin_actions(usermod =' ', users = 'browntiger776', passw = 'maker'), 404)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_admin_actions_invalid_combination2(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 404)
            mocked_post.return_value.json.return_value = fakeToken
            self.assertEqual(admin_actions(usermod =' ', passw = 'maker'), 404)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_admin_actions_invalid_combination3(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 404)
            mocked_post.return_value.json.return_value = fakeToken
            self.assertEqual(admin_actions(username = 'browntiger776' , sessionsupd = 'source'), 404)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_admin_actions_invalid_combination4(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'post') as mocked_post:
            mocked_post.return_value = Mock(status_code = 404)
            mocked_post.return_value.json.return_value = fakeToken
            self.assertEqual(admin_actions(username = 'browntiger776' , users = 'browntiger776' , source = 'source'), 404)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()

    def test_admin_actions_invalid_combination5(self):
        with patch.object(requests, 'post') as mocked_login:
            mocked_login.return_value = Mock(status_code = 200)
            mocked_login.return_value.json.return_value = fakeToken
            login('organicfrog305', 'gilles')
        with patch.object(requests, 'get') as mocked_get:
            mocked_get.return_value = Mock(status_code = 404)
            mocked_get.return_value.json.return_value = fakeToken
            self.assertEqual(admin_actions(users = 'browntiger776' , source = 'source'), 404)
        with patch.object(requests, 'post') as mocked_logout:
            mocked_logout.return_value = Mock(status_code = 200)
            mocked_logout.return_value.json.return_value = fakeToken
            logout()


if __name__ == '__main__':
    unittest.main()
