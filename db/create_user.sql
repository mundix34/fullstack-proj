INSERT into users
    (user_name, email, auth_id, picture)
VALUES
    ($1, $2, $3, $4);

RETURNING *;
