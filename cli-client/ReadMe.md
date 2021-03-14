# CLI-client

Για να τρέξει ο client χρησιμοποιούμε την εντολή python3 evgroup_38 scope --params

Με την εντολή python3 evgroup_38 --help φαίνονται όλες τα διαθέσιμα scopes, ενώ εάν θέλουμε να δούμε αναλυτικά τις διαθέσιμες παραμέτρους ενός scope χρησιμοποιείται η εντολή python3 evgroup_38 scope --help

Οι διαθέσιμες εντολές είναι:

    python3 evgroup_38 healthcheck
    python3 evgroup_38 resetsessions
    python3 evgroup_38 login
    python3 evgroup_38 logout
    python3 evgroup_38 SessionsPerPoint --point --datefrom --dateto --format <json/csv>
    python3 evgroup_38 SessionsPerStation --station --datefrom --dateto --format <json/csv>
    python3 evgroup_38 SessionsPerEV --ev --datefrom --dateto --format <json/csv>
    python3 evgroup_38 SessionsPerProvider --provider --datefrom --dateto --format <json/csv>
    python3 evgroup_38 Admin --usermod --create --username --passw
    python3 evgroup_38 Admin --usermod --update --username --passw
    python3 evgroup_38 Admin --users
    python3 evgroup_38 Admin --sessionsupd --source <csv_file_name>
    python3 evgroup_38 Admin --healthcheck
    python3 evgroup_38 Admin --resetsessions

Για το Unit Testing εκτελούμε μέσα στον φάκελο (directory) CLI_unit_tests την εντολή:

python3 -m unittest -v test_unit_cli

Για το Functional Testing εκτελούμε μέσα στον φάκελο (directory) CLI_functional_tests την εντολή:

py.test -v test_functional_cli.py


Υποσημείωση: Για την εντολή python3 evgroup_38 Admin --sessionsupd --source <csv_file_name> το αρχείο csv θα πρέπει να βρίσκεται στο directory που τρέχει το cli 
