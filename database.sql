


create TABLE person(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    roles VARCHAR(255)[]
);

create TABLE role(
    value VARCHAR(255) PRIMARY KEY UNIQUE DEFAULT USER
);

create TABLE person_role(
    person_id INT,
    role_value VARCHAR(255),
    FOREIGN KEY (person_id) REFERENCES person (id),
    FOREIGN KEY (role_value) REFERENCES role (value),
    PRIMARY KEY (person_id, role_value)
);