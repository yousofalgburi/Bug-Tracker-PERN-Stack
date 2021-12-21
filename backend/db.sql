CREATE TABLE teams (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teamName VARCHAR(50) NOT NULL,
    teamCode VARCHAR(50) NOT NULL UNIQUE,
    teamCount integer
);

CREATE TABLE bugs (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    errorCode VARCHAR(50) NOT NULL,
    teamCode VARCHAR(50) REFERENCES teams(teamCode),
    errorMessage TEXT NOT NULL,
    creationDate DATE NOT NULL DEFAULT CURRENT_DATE,
    createdBy VARCHAR(50) NOT NULL,
    resolved boolean DEFAULT false
);

CREATE TABLE members (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teamCode VARCHAR(50) REFERENCES teams(teamCode),
    memberName VARCHAR(50) NOT NULL
);