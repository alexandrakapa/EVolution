cli-client

Για να τρέξει ο client χρησιμοποιούμε την εντολή python3 evgroup_38 scope --params

Με την εντολή python3 evgroup_38 --help φαίνονται όλες τα διαθέσιμα scopes,
ενώ εάν θέλουμε να δούμε αναλυτικά τις διαθέσιμες παραμέτρους ενός scope
χρησιμοποιείται η εντολή python3 evgroup_39 scope --help

Οι διαθέσιμες εντολές είναι:
 - python3 evgroup_38 healthcheck
 - python3 evgroup_38 resetsessions
 - python3 evgroup_38 login
 - python3 evgroup_38 logout
 - python3 evgroup_38 SessionsPerPoint --point <point> --datefrom <datefrom> --dateto <dateto> --format <json/csv>
 - python3 evgroup_38 SessionsPerStation --station <station> --datefrom <datefrom> --dateto <dateto> --format <json/csv>
 - python3 evgroup_38 SessionsPerEV --ev <ev> --datefrom <datefrom> --dateto <dateto> --format <json/csv>
 - python3 evgroup_38 SessionsPerProvider --provider <provider> --datefrom <datefrom> --dateto <dateto> --format <json/csv>
 - python3 evgroup_38 Admin --usermod --create --username <username> --passw <password>
 - python3 evgroup_38 Admin --usermod --update --username <username> --passw <password>
 - python3 evgroup_38 Admin --users <username>
 - python3 evgroup_38 Admin --sessionsupd --source <csv_file_name>
 - python3 evgroup_38 Admin --healthcheck
 - python3 evgroup_38 Admin --resetsessions



Για το Unit Testing εκτελούμε μέσα στον φάκελο (directory) CLI_unit_tests την εντολή:

python3 -m unittest -v test_unit_cli


Για το Functional Testing εκτελούμε μέσα στον φάκελο (directory) CLI_functional_tests την εντολή:

py.test -v test_functional_cli.py
