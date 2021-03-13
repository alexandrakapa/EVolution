from cli import evgroup_38
import click
import pytest
import subprocess
import json
import requests
from click.testing import CliRunner
import urllib3
urllib3.disable_warnings()


def test_login():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['login', '--username', 'happydog149', '--passw','ametuer'])
    assert result.exit_code == 0

def test_admin_users():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['Admin', '--users', 'angrybird515'])
    #assert result.exit_code == 0
    assert not "invalid combination" in result.output

def test_admin_users2():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['Admin', '--username', 'angrybird515', '--users', 'angrybird515'])
    #assert result.exit_code == 0
    assert "invalid combination" in result.output

def test_admin_users3():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['Admin', '--username', 'angrybird515'])
    assert result.exit_code == 0
    assert "invalid combination" in result.output

def test_admin_usermod():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['Admin','--username', 'browntiger776', 'passw', 'maker'])
    #assert result.exit_code == 0
    assert not "has been created or changed password" in result.output


def test_logout():
    urllib3.disable_warnings()
    runner = CliRunner()
    result = runner.invoke(evgroup_38, ['logout'])
    assert result.exit_code == 0