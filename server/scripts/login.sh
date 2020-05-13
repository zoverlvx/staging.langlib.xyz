curl -d '{"email": "'"$1"'", "password": "'"$2"'"}' \
-H "Content-Type: application/json" \
-X POST "localhost:5000/api/auth/login"
