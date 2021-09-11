-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 11 Sep 2021 pada 15.09
-- Versi Server: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `barang`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `barang`
--

CREATE TABLE `barang` (
  `barang_id` int(11) NOT NULL,
  `barang_name` varchar(250) NOT NULL,
  `barang_beli` int(250) NOT NULL,
  `barang_jual` int(250) NOT NULL,
  `barang_image` varchar(250) NOT NULL,
  `barang_stok` int(250) NOT NULL,
  `barang_created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `barang_updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `barang`
--

INSERT INTO `barang` (`barang_id`, `barang_name`, `barang_beli`, `barang_jual`, `barang_image`, `barang_stok`, `barang_created_at`, `barang_updated_at`) VALUES
(56, 'Apel 01', 1000, 2000, '2021-09-11T13-03-13.779Zimage 2.png', 200, '2021-09-11 13:03:13', '0000-00-00 00:00:00'),
(57, 'Apel 02', 2000, 1000, '2021-09-11T13-03-42.598ZEllipse 183.png', 100, '2021-09-11 13:03:42', '0000-00-00 00:00:00'),
(58, 'Mangga 01', 5000, 7000, '2021-09-11T13-04-13.541Zx.png', 100, '2021-09-11 13:04:13', '0000-00-00 00:00:00'),
(59, 'Mangga 02', 1200, 2000, '2021-09-11T13-04-41.160ZEllipse 15.png', 100, '2021-09-11 13:04:41', '0000-00-00 00:00:00'),
(60, 'Jeruk 01', 3000, 5400, '2021-09-11T13-05-08.125ZEllipse 183.png', 100, '2021-09-11 13:05:08', '0000-00-00 00:00:00'),
(61, 'Jeruk 02', 2000, 12000, '2021-09-11T13-05-38.049Zx.png', 100, '2021-09-11 13:05:38', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barang`
--
ALTER TABLE `barang`
  ADD PRIMARY KEY (`barang_id`),
  ADD UNIQUE KEY `barang_name` (`barang_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `barang`
--
ALTER TABLE `barang`
  MODIFY `barang_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
