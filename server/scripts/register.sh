curl -d '{"firstName": "'"$1"'", "lastName": "'"$2"'", "email": "'"$3"'", "password": "'"$4"'"}' \
-H "Content-Type: application/json" \
-X POST "localhost:5000/api/auth/register"
