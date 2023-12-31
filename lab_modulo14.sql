-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-07-2023 a las 07:04:07
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lab_modulo14`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `Cedula_Paciente` int(11) NOT NULL,
  `Especialidad` varchar(50) NOT NULL,
  `Disponibilidad_Doctor` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--

INSERT INTO `citas` (`Cedula_Paciente`, `Especialidad`, `Disponibilidad_Doctor`) VALUES
(1, 'Cardiología', 1),
(3, 'Radiología', 1);
(2, 'Medicina interna', 1),
(6, 'Medicina general', 1),
(4, 'Dermatología', 1);
(5, 'Psicología', 1),

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctores`
--

CREATE TABLE `doctores` (
  `Cedula` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Especialidad` varchar(50) NOT NULL,
  `Consultorio` int(11) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Disponibilidad` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `doctores`
--

INSERT INTO `doctores` (`Cedula`, `Nombres`, `Apellidos`, `Especialidad`, `Consultorio`, `Correo`, `Disponibilidad`) VALUES
(1, 'Juan Estebas', 'Bocanegra Gonzales', 'Cardiología', 15, 'paco@correo.com', 1),
(2, 'Gabriel Ramiro', 'Garcia Garcia ', 'Medicina interna', 4, 'fabri@correo.com', 1),
(3, 'Maria Jose', 'Monsalve Barreto', 'Radiología', 222, 'tomy@correo.com', 1);
(4, 'Sebastian', 'Hernandez Garcia', 'Dermatología', 15, 'paco@correo.com', 1),
(5, 'Anyel Maria', 'Nova Silva', 'Psicología', 4, 'fabri@correo.com', 1),
(6, 'Esteban Javier', 'Rodriguez Ramirez', 'Medicina general', 222, 'tomy@correo.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pacientes`
--

CREATE TABLE `pacientes` (
  `Cedula` int(11) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Edad` int(11) NOT NULL,
  `Telefono` varchar(11) NOT NULL,
  `Especialidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pacientes`
--

INSERT INTO `pacientes` (`Cedula`, `Nombres`, `Apellidos`, `Fecha_Nacimiento`, `Edad`, `Telefono`, `Especialidad`) VALUES
(1, 'Juan Sebastian', 'Bocanegra Barrera', '2002-04-04', 22, '1212121212', 'Cardiologia'),
(2, 'Maria', 'Cardozo Ramiro', '2018-04-05', 5, '3152390495', 'Medicina interna'),
(3, 'Kateryne', 'Lopez', '2015-03-04', 8, '3152390495', 'Radiología');
(4, 'Mallery', 'Bocanegra Ramirez', '2002-04-04', 22, '1212121212', 'Dermatología'),
(5, 'Gabriela', 'Moncada', '2018-04-05', 5, '3152390495', 'Psicología'),
(6, 'Juliana', 'Rodriguez Cardozo', '2015-03-04', 8, '3152390495', 'Medicina general');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`Cedula_Paciente`,`Especialidad`);

--
-- Indices de la tabla `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`Cedula`,`Especialidad`);

--
-- Indices de la tabla `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`Cedula`,`Especialidad`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
