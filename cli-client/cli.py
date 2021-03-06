#!/usr/bin/python3

import click
import requests
import json
import os

@click.group()
def evgroup_38():
    pass

@evgroup_38.command(name='login')
@click.option('--username', type=str, prompt = 'Username:')
@click.option('--passw', type=str, prompt = 'Password:', hide_input =True)
def login(username,passw):
    url = "http://localhost:8765/login"
    payload='username='+username+'&password='+passw
    click.echo(payload)
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    f = open("softeng20bAPI.token", "w")
    f.write(json.loads(response.text)["accessToken"])
    f.close()
    click.echo(json.loads(response.text)["accessToken"])


@evgroup_38.command(name='logout')
def logout():
    f = open("softeng20bAPI.token", "r")
    tok = f.read()
    click.echo(tok)
    url = "http://localhost:8765/logout"

    payload={}
    headers = {
    'x-access-token': tok
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    if os.path.exists("softeng20bAPI.token"):
        os.remove("softeng20bAPI.token")
    click.echo("User logged out")
    "print(response.text)"

@evgroup_38.command(name='healthcheck')
def healthcheck():
    URL = ("http://localhost:8765/evcharge/api/admin/healthcheck")
    r = requests.get(url = URL)
    result = r.json()
    click.echo(result)

@evgroup_38.command(name='resetsessions')
def reset():
    URL = ("http://localhost:8765/evcharge/api/admin/resetsessions")
    r = requests.post(url = URL)
    result = r.json()
    click.echo(result)

@evgroup_38.command(name='SessionsPerPoint', help='Find sessions that took place at a certain point')
@click.option('--point','--p', type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
def sessions_per_point(point,datefrom,dateto):
    URL = ("http://localhost:8765/evcharge/api/SessionsPerPoint/"+point+'/'+datefrom+'/'+dateto)
    r = requests.get(url = URL)
    result = r.json()
    click.echo(result)

@evgroup_38.command(name='SessionsPerStation', help= 'Find sessions os a certain station')
@click.option('--station','--s',type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
def sessions_per_station(station,datefrom,dateto):
    URL = ("http://localhost:8765/evcharge/api/SessionsPerStation/"+station+'/'+datefrom+'/'+dateto)
    r = requests.get(url = URL)
    result = r.json()
    click.echo(result)

@evgroup_38.command(name='SessionsPerEV', help = 'Find sessions of certain vehicle')
@click.option('--ev','--e',type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
def sessions_per_ev(ev,datefrom,dateto):
    URL = ("http://localhost:8765/evcharge/api/SessionsPerEV/"+ev+'/'+datefrom+'/'+dateto)
    r = requests.get(url = URL)
    "result = r.json()"
    click.echo(r.json())

@evgroup_38.command(name='SessionsPerProvider', help = 'Find sessions associated with requested provider')
@click.option('--provider','--p',type=str)
@click.option('--datefrom', '--from', '--f', type=str, prompt = 'Give me datefrom')
@click.option('--dateto','--to','--t', type=str, prompt = 'Give me dateto')
def sessions_per_provider(provider,datefrom,dateto):
    URL = ("http://localhost:8765/evcharge/api/SessionsPerProvider/"+provider+'/'+datefrom+'/'+dateto)
    r = requests.get(url = URL)
    result = r.json()
    click.echo(result)

@evgroup_38.command(name = 'Admin', help = 'Admin actions')
@click.option('--usermod', nargs=0)
@click.option('--username',default = 'nothing_inserted')
@click.option('--passw', default = 'nothing_inserted')
@click.option('--users', default = 'not_selected')
@click.option('--sessionsupd', default = 'not_selected')
def admin_actions(usermod,username,passw,users,sessionsupd):
    if (users != 'not_selected' and sessionsupd == 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
        URL = ("http://localhost:8765/evcharge/api/admin/users/"+users)
        r = requests.get(url = URL)
        result = r.json()
        click.echo(result)
    elif (users == 'not_selected' and sessionsupd != 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
        URL = "http://localhost:8765/evcharge/api/admin/system/sessionsupd"
        r = requests.post(url=URL)
        click.echo(r.text)
    elif (users == 'not_selected' and sessionsupd == 'not_selected' and username != 'nothing_inserted' and passw != 'nothing_inserted'):
        URL = ("http://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
        r = requests.post(url=URL)
        click.echo(r.text)
    else:
        click.echo('invalid combination')

if __name__ == '__main__':
    evgroup_38()
