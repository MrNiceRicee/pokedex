
CREATE TABLE pokemons (
    id INTEGER PRIMARY KEY,
    name TEXT,
    height FLOAT,
    weight FLOAT,
    image TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE types (
    id INTEGER PRIMARY KEY,
    name TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pokemon_types (
    id SERIAL PRIMARY KEY,
    pokemon_id INTEGER,
    type_id INTEGER,
    FOREIGN KEY (pokemon_id) REFERENCES pokemons (id),
    FOREIGN KEY (type_id) REFERENCES types (id),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TABLE abilities (
--     id INTEGER PRIMARY KEY,
--     name TEXT,
--     type TEXT,
--     power INTEGER,
--     accuracy INTEGER,
--     pp INTEGER,
--     description TEXT
-- );

-- CREATE TABLE pokemon_abilities (
--     pokemon_id INTEGER,
--     move_id INTEGER,
--     FOREIGN KEY (pokemon_id) REFERENCES pokemons (id),
--     FOREIGN KEY (move_id) REFERENCES abilities (id)
-- );
