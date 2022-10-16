# download CA cert for server certificate verification
curl --create-dirs -o $HOME/.postgresql/root.crt -O https://cockroachlabs.cloud/clusters/0434e32b-f793-485d-8426-e6b1ac80ab13/cert

# install packages
pip install -r requirements.txt

#export CONN_STR=cockroachdb://jeremy:MKixjPluseHEGPBYsPHCJA@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dwolf-gnoll-5791
