-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS aula_api_2024;
USE aula_api_2024;

-- Remover tabelas se já existirem (na ordem certa por causa das chaves estrangeiras)
DROP TABLE IF EXISTS Cantor;
DROP TABLE IF EXISTS FeatFamoso;
DROP TABLE IF EXISTS Gravadora;

-- Criação da tabela Gravadora (equivalente a Veiculo)
CREATE TABLE Gravadora (
    idGravadora INT PRIMARY KEY,
    nomeGravadora VARCHAR(50),
    localizacao VARCHAR(50)
);

-- Criação da tabela FeatFamoso (equivalente a Aplicativo)
CREATE TABLE FeatFamoso (
    idFeat INT PRIMARY KEY,
    nomeFeat VARCHAR(50),
    cantorFeat VARCHAR(50),
    streams VARCHAR(50)
);

-- Criação da tabela Cantor (equivalente a Usuario)
CREATE TABLE Cantor (
    idCantor INT PRIMARY KEY,
    nomeCantor VARCHAR(50),
    nacionalidade VARCHAR(50),
    idade VARCHAR(3),
    sexo VARCHAR(15),
    Gravadora_idGravadora INT,
    FeatFamoso_idFeat INT,
    FOREIGN KEY (Gravadora_idGravadora) REFERENCES Gravadora(idGravadora),
    FOREIGN KEY (FeatFamoso_idFeat) REFERENCES FeatFamoso(idFeat)
);

-- Inserts para Gravadora
INSERT INTO Gravadora VALUES (100, 'Capitol Records', 'Los Angeles');
INSERT INTO Gravadora VALUES (200, 'Cactus Jack Records', 'Houston');
INSERT INTO Gravadora VALUES (300, 'XO Records', 'Los Angeles');
INSERT INTO Gravadora VALUES (400, '30praum', 'Fortaleza');
INSERT INTO Gravadora VALUES (500, 'RCA Records', 'Nova Iorque');
INSERT INTO Gravadora VALUES (600, 'Universal Music Group', 'Holanda');
INSERT INTO Gravadora VALUES (700, 'SALVE CRAZY REC', 'São Paulo');
INSERT INTO Gravadora VALUES (800, '88rising', 'Nova Iorque');
INSERT INTO Gravadora VALUES (900, 'Labbel Records', 'São Paulo');

-- Inserts para FeatFamoso
INSERT INTO FeatFamoso VALUES (10, 'Fantasy', 'Don Toliver', '89.5 mi');
INSERT INTO FeatFamoso VALUES (20, 'Bus Stop', 'Brent Faiyaz', '63 mi');
INSERT INTO FeatFamoso VALUES (30, 'Stargirl Interlude', 'Lana Del Rey', '1.4 bi');
INSERT INTO FeatFamoso VALUES (40, 'Conexões de Máfia', 'Rich the Kid', '190 mi');
INSERT INTO FeatFamoso VALUES (50, '30 for 30', 'Kendrick Lamar', '220 mi');
INSERT INTO FeatFamoso VALUES (60, 'FE!N', 'Playboi Carti', '1.3 bi');
INSERT INTO FeatFamoso VALUES (70, 'Rich Flex', '21 Savage', '900 mi');
INSERT INTO FeatFamoso VALUES (80, 'Vandame', 'Derek', '20 mi');
INSERT INTO FeatFamoso VALUES (90, 'I Don’t Wanna Live Forever', 'Taylor Swift', '1.9 bi');
INSERT INTO FeatFamoso VALUES (100, 'I Like It', 'Cardi B', '1.8 bi');
INSERT INTO FeatFamoso VALUES (110, 'Afterthought', 'Benee', '202 mi');
INSERT INTO FeatFamoso VALUES (120, 'Normal', 'Veigh', '10 mi');

-- Inserts para Cantor
INSERT INTO Cantor VALUES (1, 'Kali Uchis', 'Americana', '30', 'Feminino', 100, 10);
INSERT INTO Cantor VALUES (2, 'Don Toliver', 'Americano', '30', 'Masculino', 200, 20);
INSERT INTO Cantor VALUES (3, 'The Weeknd', 'Canadense', '35', 'Masculino', 300, 30);
INSERT INTO Cantor VALUES (4, 'Matuê', 'Brasileiro', '31', 'Masculino', 400, 40);
INSERT INTO Cantor VALUES (5, 'SZA', 'Americana', '35', 'Feminino', 500, 50);
INSERT INTO Cantor VALUES (6, 'Travis Scott', 'Americano', '34', 'Masculino', 200, 60);
INSERT INTO Cantor VALUES (7, 'Drake', 'Canadense', '38', 'Masculino', 600, 70);
INSERT INTO Cantor VALUES (8, 'Ryu The Runner', 'Brasileiro', '20', 'Masculino', 700, 80);
INSERT INTO Cantor VALUES (9, 'Zayn Malik', 'Britânico', '32', 'Masculino', 500, 90);
INSERT INTO Cantor VALUES (10, 'Bad Bunny', 'Porto-riquenho', '31', 'Masculino', 600, 100);
INSERT INTO Cantor VALUES (11, 'Joji', 'Japonês', '32', 'Masculino', 800, 110);
INSERT INTO Cantor VALUES (12, 'Yunk Vino', 'Brasileiro', '27', 'Masculino', 900, 120);



select * from Gravadora;
