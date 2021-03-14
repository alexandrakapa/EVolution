#!/usr/bin/env python3
import json
import os
import click
import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

@click.group()
def evgroup_38():
    pass

@evgroup_38.command(name='login')
@click.option('--username', type=str, prompt = 'Username:')
@click.option('--passw', type=str, prompt = 'Password:', hide_input =True)
def login(username,passw):
    url = "https://localhost:8765/evcharge/api/login"
    payload='username='+username+'&password='+passw
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.request("POST", url, headers=headers, data=payload, verify = False)
    f = open("softeng20bAPI.token", "w")
    f.write(json.loads(response.text)["accessToken"])
    f.close()
    """click.echo(json.loads(response.text)["accessToken"])"""


@evgroup_38.command(name='logout')
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
        response = requests.request("POST", url, headers=headers, data=payload, verify = False)
        if os.path.exists("softeng20bAPI.token"):
            os.remove("softeng20bAPI.token")
        click.echo("User logged out")
        "print(response.text)"

@evgroup_38.command(name='healthcheck')
def healthcheck():
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        URL = ("https://localhost:8765/evcharge/api/admin/healthcheck")
        payload={}
        headers = {
                'x-access-token': tok
                }
        response = requests.get( url= URL, headers=headers, data=payload, verify = False)
        click.echo(response.text)

@evgroup_38.command(name='resetsessions')
def reset():
    URL = ("https://localhost:8765/evcharge/api/admin/resetsessions")
    r = requests.post(url = URL,verify=False)
    result = r.json()
    click.echo(result)

@evgroup_38.command(name='SessionsPerPoint', help='Find sessions that took place at a certain point')
@click.option('--point','--p', type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
@click.option('--format', type=str, default = 'json')
def sessions_per_point(point,datefrom,dateto,format):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)

        payload={}
        headers = {
                'x-access-token': tok
                }

        URL = ("https://localhost:8765/evcharge/api/SessionsPerPoint/"+point+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data=payload, verify = False)
        #result = r.json()
        click.echo(r.text)
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

@evgroup_38.command(name='SessionsPerStation', help= 'Find sessions os a certain station')
@click.option('--station','--s',type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
@click.option('--format', type=str, default = 'json')
def sessions_per_station(station,datefrom,dateto,format):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)

        payload={}
        headers = {
                'x-access-token': tok
                }

        URL = ("https://localhost:8765/evcharge/api/SessionsPerStation/"+station+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data=payload, verify = False)
        click.echo(r.text)
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

@evgroup_38.command(name='SessionsPerEV', help = 'Find sessions of certain vehicle')
@click.option('--ev','--e',type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
@click.option('--format', type=str, default = 'json')
def sessions_per_ev(ev,datefrom,dateto,format):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)

        payload={}
        headers = {
                'x-access-token': tok
                }
        URL = ("https://localhost:8765/evcharge/api/SessionsPerEV/"+ev+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data=payload, verify = False)
        click.echo(r.text)
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

@evgroup_38.command(name='SessionsPerProvider', help = 'Find sessions associated with requested provider')
@click.option('--provider','--p',type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
@click.option('--format', type=str, default = 'json')
def sessions_per_provider(provider,datefrom,dateto,format):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)

        payload={}
        headers = {
                'x-access-token': tok
                }
        URL = ("https://localhost:8765/evcharge/api/SessionsPerProvider/"+provider+'/'+datefrom+'/'+dateto+'/?format='+format)
        r = requests.get(url = URL, headers=headers, data = payload, verify = False)
        click.echo(r.text)
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

@evgroup_38.command(name = 'Admin', help = 'Admin actions')
@click.option('--usermod', nargs=0)
@click.option('--username',default = 'nothing_inserted')
@click.option('--passw', default = 'nothing_inserted')
@click.option('--users', default = 'not_selected')
@click.option('--sessionsupd', default = 'not_selected')
@click.option('--format', type=str, default = 'json')
def admin_actions(usermod,username,passw,users,sessionsupd,format):
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
            r = requests.get(url = URL, headers = headers, data = payload, verify = False)
            result = r.json()
            click.echo(result)
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
            response = requests.request("POST", url, headers=headers, data=payload, files=files, verify = False)
            print(response.text)

        elif (users == 'not_selected' and sessionsupd == 'not_selected' and username != 'nothing_inserted' and passw != 'nothing_inserted'):
            URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
            r = requests.post(url=URL, headers=headers, verify = False)
            click.echo(r.text)
        else:
            click.echo('Invalid combination.')
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

if __name__ == '__main__':
    evgroup_38()
