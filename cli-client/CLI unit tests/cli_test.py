import json
import os
import click
import requests

def login(username,passw):
    url = "http://localhost:8765/evcharge/api/login"
    payload='username='+username+'&password='+passw
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    f = open("softeng20bAPI.token", "w")
    f.write(json.loads(response.text)["accessToken"])
    f.close()
    """click.echo(json.loads(response.text)["accessToken"])"""
    return response.status_code

def logout():
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
        url = "http://localhost:8765/logout"
        
        payload={}
        headers = {
                'x-access-token': tok
                }
        response = requests.request("POST", url, headers=headers, data=payload)
        if os.path.exists("softeng20bAPI.token"):
            os.remove("softeng20bAPI.token")
        #click.echo("User logged out")
        "print(response.text)"
        return response.status_code


def healthcheck():
    URL = ("http://localhost:8765/evcharge/api/admin/healthcheck")
    r = requests.get(url = URL)
    result = r.json()
    #click.echo(result)
    return result


def reset():
    URL = ("http://localhost:8765/evcharge/api/admin/resetsessions")
    r = requests.post(url = URL)
    result = r.json()
    #click.echo(result)
    return result

def sessions_per_point(point,datefrom,dateto):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)

        payload={}
        headers = {
                'x-access-token': tok
                }

        URL = ("http://localhost:8765/evcharge/api/SessionsPerPoint/"+point+'/'+datefrom+'/'+dateto)
        r = requests.get(url = URL, headers=headers, data=payload)
        result = r.json()
        #click.echo(result)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1

def sessions_per_station(station,datefrom,dateto):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }
        
        URL = ("http://localhost:8765/evcharge/api/SessionsPerStation/"+station+'/'+datefrom+'/'+dateto)
        r = requests.get(url = URL, headers=headers, data=payload)
        """result = r.json()"""
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1 

def sessions_per_ev(ev,datefrom,dateto):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }
        URL = ("http://localhost:8765/evcharge/api/SessionsPerEV/"+ev+'/'+datefrom+'/'+dateto)
        r = requests.get(url = URL, headers=headers, data=payload)
        "result = r.json()"
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1

def sessions_per_provider(provider,datefrom,dateto):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }
        URL = ("http://localhost:8765/evcharge/api/SessionsPerProvider/"+provider+'/'+datefrom+'/'+dateto)
        r = requests.get(url = URL, headers=headers, data = payload)
        """result = r.json()"""
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1

def admin_actions(usermod = None ,username='nothing_inserted',passw='nothing_inserted',users ='not_selected',sessionsupd='not_selected'):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }

        if (users != 'not_selected' and sessionsupd == 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
            URL = ("http://localhost:8765/evcharge/api/admin/users/"+users)
            r = requests.get(url = URL, headers = headers, data = payload)
            result = r.json()
            #click.echo(result)
            res = [r.status_code, 0]
            return res
        elif (users == 'not_selected' and sessionsupd != 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
            URL = "http://localhost:8765/evcharge/api/admin/system/sessionsupd"
            r = requests.post(url=URL, headers=headers, data=payload)
            #click.echo(r.text)
            res = [r.status_code, 1]
            return res
        elif (users == 'not_selected' and sessionsupd == 'not_selected' and username != 'nothing_inserted' and passw != 'nothing_inserted'):
            URL = ("http://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
            r = requests.post(url=URL, headers=headers)
            #click.echo(r.text)
            res = [r.status_code, 2]
            return res
        else:
            #click.echo('Invalid combination.')
            return 404
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1
