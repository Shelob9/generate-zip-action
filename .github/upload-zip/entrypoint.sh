#!/bin/sh -l

curl -F "file=@test.txt" https://file.io/?expires=1w
echo ${GITHUB_WORKSPACE}
