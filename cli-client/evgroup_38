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
@click.option('--username', type=str, prompt = 'Username')
@click.option('--passw', type=str, prompt = 'Password', hide_input =True)
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
    if(json.loads(response.text)):
        click.echo('\nWelcome back!\n')
    else:
        click.echo('\nOoops! Your username or password was wrong :(\nPlease try again!\n')


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
        f.close()
        click.echo("\nLog out successful!\nSee you again soon!\n")


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
        f.close()
        click.echo(response.text)

@evgroup_38.command(name='resetsessions')
def reset():
    URL = ("https://localhost:8765/evcharge/api/admin/resetsessions")
    r = requests.post(url = URL, verify = False)
    #result = r.json()
    click.echo('\nSessions have been deleted and admin credentials reset!\n')

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
        f.close()
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
        f.close()
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
        f.close()
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
        f.close()
        click.echo(r.text)
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

@evgroup_38.command(name = 'Admin', help = 'Admin actions')
@click.option('--usermod', nargs=0)
@click.option('--username',default = 'nothing_inserted')
@click.option('--passw', default = 'nothing_inserted')
@click.option('--users', default = 'not_selected')
@click.option('--sessionsupd', nargs=0)
@click.option('--source', default = 'not_selected')
@click.option('--format', type=str, default = 'json')
@click.option('--create', is_flag = True)
@click.option('--update',is_flag=True)
@click.option('--healthcheck',is_flag=True)
@click.option('--resetsessions',is_flag=True)
def admin_actions(usermod,username,passw,users,sessionsupd,source,format,create,update,healthcheck,resetsessions):
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        #click.echo(tok)
        f.close()
        payload={}
        headers = {
                'x-access-token': tok
                }

        if (users != 'not_selected' and source == 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
            URL = ("https://localhost:8765/evcharge/api/admin/users/"+users+'/?format='+format)
            r = requests.get(url = URL, headers = headers, data = payload, verify = False)
            result = r.json()
            click.echo(result)
            return
        elif (users == 'not_selected' and source != 'not_selected' and username == 'nothing_inserted' and passw == 'nothing_inserted'):
            #URL = "https://localhost:8765/evcharge/api/admin/system/sessionsupd"

            #r = requests.post(url=URL, headers=headers, data=payload)
            #click.echo(r.text)
            url = "https://localhost:8765/evcharge/api/admin/system/sessionsupd"
            payload={}
            files=[('file',(source,open(source,'rb'),'text/csv'))]
            headers = {
                    'x-access-token': tok
                    }
            response = requests.request("POST", url, headers=headers, data=payload, files=files, verify = False)
            click.echo(response.text)
            return

        elif (users == 'not_selected' and source == 'not_selected' and username != 'nothing_inserted' and passw != 'nothing_inserted'):
            if(create):
                email = input("\nEmail:")
                phone_number = input("\nPhone_number:")
                whatamI = input("\nWhat is the new user?(Car Owner, Manufacturer, Energy Supplier):")

                while (whatamI!='Car Owner') & (whatamI!='Manufacturer') & (whatamI!='Energy Supplier'):
                    click.echo('\nInvalid user type. Please try again. Available options are: Car Owner, Manufacturer, Energy Supplier\n')
                    whatamI = input("\nWhat is the new user?(Car Owner, Manufacturer, Energy Supplier):")

                if (whatamI == 'Car Owner'):
                    payload ={ 'email' :email,'phone_number':phone_number,'price_to_pay':0,'points':0}
                    URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                    r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                    click.echo(r.text)
                    return
                elif (whatamI == 'Manufacturer'):
                    company_name = input('Company Name:')
                    payload ={ 'email' :email,'phone':phone_number,'price_to_pay':0,'points':0, 'whatamI':0, 'company_name':company_name, 'is_user':1}
                    URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                    r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                    click.echo(r.text)
                    return
                elif (whatamI == 'Energy Supplier'):
                    company_name = input('Company Name:')
                    payload ={ 'email' :email,'phone':phone_number,'price_to_pay':0,'points':0, 'whatamI':1, 'company_name':company_name, 'is_user':1}
                    URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                    r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                    click.echo(r.text)
                    return
            elif (update):
                URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                click.echo(r.text)
                return
            else:
                click.echo('\nInvalid combination. Should choose --create or --update\n')
        elif (resetsessions and not healthcheck):
            URL = ("https://localhost:8765/evcharge/api/admin/resetsessions")
            r = requests.post(url = URL, verify = False)
            #result = r.json()
            click.echo('\nSessions have been deleted and admin credentials reset!\n')
        elif (healthcheck and not resetsessions):
            if os.path.exists("softeng20bAPI.token"):
                f = open("softeng20bAPI.token", "r")
                tok = f.read()
                URL = ("https://localhost:8765/evcharge/api/admin/healthcheck")
                payload={}
                headers = {
                        'x-access-token': tok
                        }
                response = requests.get( url= URL, headers=headers, data=payload, verify = False)
                f.close()
                click.echo(response.text)
        else:
            click.echo('\nInvalid Combination\n')
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")

if __name__ == '__main__':
    evgroup_38()
