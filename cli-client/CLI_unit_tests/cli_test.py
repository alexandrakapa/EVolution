import json
import os
import click
import requests
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def login(username,passw):

    url = "https://localhost:8765/evcharge/api/login"
    payload='username='+username+'&password='+passw
    headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    }

    response = requests.request("POST", url, headers=headers, data=payload, verify=False)
    f = open("softeng20bAPI.token", "w")
    f.write(json.loads(response.text)["accessToken"])
    f.close()
    if(json.loads(response.text)):
        return response.status_code
    else:
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
        f.close()
        # click.echo("\nLog out successful!\nSee you again soon!\n")
        return response.status_code


def healthcheck():
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    if os.path.exists("softeng20bAPI.token"):
        f = open("softeng20bAPI.token", "r")
        tok = f.read()
        URL = ("https://localhost:8765/evcharge/api/admin/healthcheck")
        payload={}
        headers = {
                'x-access-token': tok
                }
        response = requests.get( url= URL, headers=headers, data=payload, verify=False)
        f.close()
        #click.echo(response.text)
        return response.status_code


def reset():
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    URL = ("https://localhost:8765/evcharge/api/admin/resetsessions")
    r = requests.post(url = URL, verify=False)
    result = r.json()
    #click.echo('\nSessions have been deleted and admin credentials reset!\n')
    return r.status_code

def sessions_per_point(point,datefrom,dateto,format='json'):
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
        f.close()
        # click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1


def sessions_per_station(station,datefrom,dateto,format='json'):
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
        f.close()
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1


def sessions_per_ev(ev,datefrom,dateto,format='json'):
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
        f.close()
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")
        return -1

def sessions_per_provider(provider,datefrom,dateto,format='json'):
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
        f.close()
        #click.echo(r.text)
        return r.status_code
    else:
        #click.echo("Invalid user. Access denied. Try logging in first.")1
        return -1

def admin_actions(usermod = None ,username='nothing_inserted',passw='nothing_inserted',users ='not_selected',sessionsupd=None, source='not_selected', format='json', create = True, update=True):
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
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
            #click.echo(result)
            return [r.status_code, 0]
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
            #click.echo('\nSessions uploaded!\n')
            return [r.status_code, 1]

        elif (users == 'not_selected' and source == 'not_selected' and username != 'nothing_inserted' and passw != 'nothing_inserted'):
            if(create):
                email = input("\nEmail:")
                phone_number = input("\nPhone_number:")
                whatamI = input("\nWhat is the new user?(Car Owner, Manufacturer, Energy Supplier):")

                while (whatamI!='Car Owner') & (whatamI!='Manufacturer') & (whatamI!='Energy Supplier'):
                    #click.echo('\nInvalid user type. Please try again. Available options are: Car Owner, Manufacturer, Energy Supplier\n')
                    whatamI = input("\nWhat is the new user?(Car Owner, Manufacturer, Energy Supplier):")

                if (whatamI == 'Car Owner'):
                    payload ={ 'email' :email,'phone_number':phone_number,'price_to_pay':0,'points':0}
                    URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                    r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                    #click.echo(r.text)
                    return [r.status_code, 21]
                elif (whatamI == 'Manufacturer'):
                    company_name = input('Company Name:')
                    payload ={ 'email' :email,'phone':phone_number,'price_to_pay':0,'points':0, 'whatamI':0, 'company_name':company_name, 'is_user':1}
                    URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                    r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                    #click.echo(r.text)
                    return [r.status_code, 22]
                elif (whatamI == 'Energy Supplier'):
                    company_name = input('Company Name:')
                    payload ={ 'email' :email,'phone':phone_number,'price_to_pay':0,'points':0, 'whatamI':1, 'company_name':company_name, 'is_user':1}
                    URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                    r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                    #click.echo(r.text)
                    return [r.status_code, 23]
            elif (update):
                URL = ("https://localhost:8765/evcharge/api/admin/usermod/"+username+'/'+passw)
                r = requests.post(url=URL, headers=headers,data=payload, verify = False)
                #click.echo(r.text)
                return [r.status_code, 3]
            else:
                #click.echo('\nInvalid combination. Should choose --create or --update\n')
                return [3, 404]
        else:
            #click.echo("\nInvalid combination\n")
            return 404
    else:
        click.echo("Invalid user. Access denied. Try logging in first.")
        return -1

if __name__ == '__main__':
    evgroup_38()
