import json
import os
import click
import requests
import urllib3

urllib3.disable_warnings()

def login(username,passw):
    #urllib3.disable_warnings()
    url = "https://localhost:8765/evcharge/api/login"
    payload='username='+username+'&password='+passw
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.request("POST", url, headers=headers, data=payload, verify=False)
    f = open("softeng20bAPI.token", "w")
    f.write(json.loads(response.text)["accessToken"])
    f.close()
    #"""click.echo(json.loads(response.text)["accessToken"])"""
    return response.status_code


def logout():
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
        url = "https://localhost:8765/logout"
        
        payload={}
        headers = {
                'x-access-token': tok
                }
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        if os.path.exists("softeng20bAPI.token"):
            os.remove("softeng20bAPI.token")
        #click.echo("User logged out")
        #"print(response.text)"
        return response.status_code


def healthcheck():
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        URL = ("https://localhost:8765/evcharge/api/admin/healthcheck")
        payload={}
        headers = {
                'x-access-token': tok
                }
        response = requests.get( url= URL, headers=headers, data=payload, verify=False)
        #click.echo(response.text)
        return response.status_code


def reset():
    URL = ("https://localhost:8765/evcharge/api/admin/resetsessions")
    r = requests.post(url = URL, verify=False)
    result = r.json()
    #click.echo(result)
    return r.status_code

def sessions_per_point(point,datefrom,dateto,format='json'):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)

        payload={}
        headers = {
                'x-access-token': tok
                }

        URL = ("https://localhost:8765/evcharge/api/SessionsPerPoint/"+point+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data=payload, verify=False)
        #result = r.json()
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1


def sessions_per_station(station,datefrom,dateto,format='json'):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }
        
        URL = ("https://localhost:8765/evcharge/api/SessionsPerStation/"+station+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data=payload, verify=False)
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1


def sessions_per_ev(ev,datefrom,dateto,format='json'):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }
        URL = ("https://localhost:8765/evcharge/api/SessionsPerEV/"+ev+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data=payload, verify=False)
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1

def sessions_per_provider(provider,datefrom,dateto,format='json'):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }
        URL = ("https://localhost:8765/evcharge/api/SessionsPerProvider/"+provider+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data = payload, verify=False)
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")1
        return -1

def admin_actions(usermod = None ,username='nothing_inserted',passw='nothing_inserted',users ='not_selected',sessionsupd='not_selected', format='json'):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
       
        payload={}
        headers = {
                'x-access-token': tok
                }

        if (users != 'not_selected' and sessionsupd == 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
            URL = ("https://localhost:8765/evcharge/api/admin/users/"+users+'/?format='+format)
            r = requests.get(url = URL, headers = headers, data = payload, verify=False)
            result = r.json()
            #click.echo(result)
            return [r.status_code, 0]
        elif (users == 'not_selected' and sessionsupd != 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
            #URL = "https://localhost:8765/evcharge/api/admin/system/sessionsupd"
            
            #r = requests.post(url=URL, headers=headers, data=payload)
            #click.echo(r.text)
            url = "https://localhost:8765/evcharge/api/admin/system/sessionsupd"
            payload={}
            files=[('file',(sessionsupd,open(sessionsupd,'rb'),'text/csv'))]
            headers = {
                    'x-access-token': tok
                    }
            response = requests.request("POST", url, headers=headers, data=payload, files=files, verify=False)
            #print(response.text)
            return [response.status_code, 1]

        elif (users == 'not_selected' and sessionsupd == 'not_selected' and username != 'nothing_inserted' and passw != 'nothing_inserted'):
            URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
            r = requests.post(url=URL, headers=headers, verify=False)
            #click.echo(r.text)
            return [r.status_code, 2]
        else:
            #click.echo('Invalid combination.')
            return 404
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1
