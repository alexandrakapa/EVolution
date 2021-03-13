from ../evgroup_38.py import evgroup_38
import click
import pytest
import subprocess
import json
import requests
from click.testing import CliRunner
import urllib3


def test_login0():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['login', '--userna', 'angrybird515', 'vfdbf'])
    assert result.exit_code != 0 

def test_login():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['login', '--username', 'organicfrog305', '--passw','gilles'])
    assert result.exit_code == 0

def test_healthcheck():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38,['healthcheck'])
    #assert "{u'Status': u'OK'}\n" in result.output
    assert result.exit_code == 0

def test_resetsessions():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38,['resetsessions'])
    assert "{u'Status': u'OK'}\n" in result.output
    assert result.exit_code == 0

def test_sessions_per_station1():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerStation', '--station', '2-39-129-17', '--datefrom','20080101','--dateto','20201010'])
    #assert "Success\n" in result.output
    assert result.exit_code == 0

def test_sessions_per_station2():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerStation', '--station', '2-99-129-17', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0
    assert "No Chargings for this Station\n" in result.output

def test_sessions_per_station3():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerStation', '--station', '2-39-129-17', '--datefrom','0101','--dateto','20201010'])
    assert result.exit_code == 0
    assert "Bad Request : Invalid Date Format\n" in result.output
    

def test_sessions_per_station4():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerStation', '--station', '2-39-129-17', '--datefrom','20080101','--dateto','2020'])
    assert result.exit_code == 0
    assert "Bad Request : Invalid Date Format\n" in result.output

def test_sessions_per_station5():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerStation', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code != 0

def test_sessions_per_station6():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerStation', '2-39-129-17', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code != 0


#def test_sessions_per_station6():
#    urllib3.disable_warnings()
#    runner = CliRunner()
#    result = runner.invoke(evgroup_38, ['SessionsPerStation'])
#    assert result.exit_code == 1

def test_sessions_per_point1():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerPoint', '--point', 'CA-3132-39-123-23', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0

def test_sessions_per_point2():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerPoint', '--point', 'CA-3132-39-123-23', '--datefrom','kat','--dateto','20201010'])
    assert result.exit_code != 0

def test_sessions_per_point3():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerPoint', '--point', 'CA-31339-123-23', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code != 0

#def test_sessions_per_point1():
#    runner = CliRunner()
#   result = runner.invoke(evgroup_38, ['SessionsPerPoint', '--point', 'CA-3132-39-123-23'])
#    assert result.exit_code == 1

def test_sessions_per_ev():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerEV', '--ev', '059c028d-b2a6-4a8d-947a-158c7537b290', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0

def test_sessions_per_ev2():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerEV', '--ev', 'kat', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0
    assert "No vehicle with this ID.\n" in result.output

def test_sessions_per_ev3():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerEV', '--ev', '059c028d-b2a6-4a8d-947a-158c7537b290', '--datefrm','20080101','--dateto','20201010'])
    assert result.exit_code != 0

#def test_sessions_per_ev4():
#    runner = CliRunner()
#    result = runner.invoke(evgroup_38, ['SessionsPerEV', '--ev', '059c028d-b2a6-4a8d-947a-158c7537b290', '--dateto','20201010'])
#    assert result.exit_code != 0


def test_sessions_per_provider():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerProvider', '--provider', '1', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0
    assert not "No Charging Point with this Provider ID.\n" in result.output

def test_sessions_per_provider2():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerProvider', '--provider', 'kat', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0
    assert "No Charging Point with this Provider ID.\n" in result.output

def test_sessions_per_provider3():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerProvider', '--proer', '1', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code != 0

def test_sessions_per_provider4():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerProvider', '--provider', '100185946', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0

def test_sessions_per_provider5():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['SessionsPerProvider', '--provider', '200', '--datefrom','20080101','--dateto','20201010'])
    assert result.exit_code == 0
    assert "No Charging Point with this Provider ID.\n" in result.output


def test_logout():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['logout'])
    assert result.exit_code == 0
