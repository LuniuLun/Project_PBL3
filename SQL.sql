USE [ShopGiayDemo]
GO
/****** Object:  Table [dbo].[customer]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[customer](
	[ID_Customer] [int] IDENTITY(1,1) NOT NULL,
	[IDRole] [int] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Gender] [nvarchar](10) NULL,
	[Birth] [datetime] NULL,
	[phoneNumber] [nvarchar](10) NOT NULL,
	[Address] [nvarchar](max) NULL,
	[accumulatedPoints] [int] NOT NULL,
	[createDay] [datetime] NOT NULL,
	[Email] [nvarchar](50) NULL,
 CONSTRAINT [PK_dbo.tb_KhachHang] PRIMARY KEY CLUSTERED 
(
	[ID_Customer] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[detailUser]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[detailUser](
	[ID_user] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nchar](100) NULL,
	[Date] [date] NULL,
	[Adress] [nchar](100) NULL,
	[SDT] [nchar](10) NOT NULL,
	[Salary] [float] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[ID_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Order]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Order](
	[ID_Bill] [int] IDENTITY(1,1) NOT NULL,
	[billState] [nvarchar](max) NOT NULL,
	[TypePayment] [bit] NOT NULL,
	[ID_User] [int] NULL,
	[ID_Customer] [int] NULL,
	[createDay] [datetime] NOT NULL,
	[TotalPrice] [decimal](18, 2) NOT NULL,
	[Discount] [decimal](18, 2) NOT NULL,
	[extraMoney] [decimal](18, 2) NOT NULL,
	[Total] [decimal](18, 2) NOT NULL,
	[Note] [nvarchar](max) NULL,
 CONSTRAINT [PK_dbo.tb_HoaDon] PRIMARY KEY CLUSTERED 
(
	[ID_Bill] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_OrderDetail]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_OrderDetail](
	[ID_bill] [int] NULL,
	[ID_product] [int] NULL,
	[Quantity] [int] NULL,
	[Price] [float] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_Product]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_Product](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Supplier] [nvarchar](max) NULL,
	[Code] [nvarchar](max) NULL,
	[Title] [nvarchar](max) NULL,
	[ID_manufacture] [nvarchar](max) NULL,
	[typeProduct] [nvarchar](max) NULL,
	[Price] [decimal](18, 2) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Image] [int] NULL,
 CONSTRAINT [PK_dbo.tb_HangHoa] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tb_ProductImage]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tb_ProductImage](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ProductId] [int] NULL,
	[Image] [nvarchar](max) NULL,
 CONSTRAINT [PK_tb_ProductImage] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[userSystem]    Script Date: 6/7/2023 5:30:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[userSystem](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_role] [nchar](10) NULL,
	[ID_shift] [nchar](10) NULL,
	[Password] [nchar](50) NULL,
	[Username] [nchar](50) NULL,
 CONSTRAINT [PK_TaiKhoanHeThong] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[detailUser]  WITH CHECK ADD  CONSTRAINT [FK_detailUser_userSystem] FOREIGN KEY([ID_user])
REFERENCES [dbo].[userSystem] ([ID])
GO
ALTER TABLE [dbo].[detailUser] CHECK CONSTRAINT [FK_detailUser_userSystem]
GO
ALTER TABLE [dbo].[tb_Order]  WITH CHECK ADD  CONSTRAINT [FK_Bill_customer] FOREIGN KEY([ID_Customer])
REFERENCES [dbo].[customer] ([ID_Customer])
GO
ALTER TABLE [dbo].[tb_Order] CHECK CONSTRAINT [FK_Bill_customer]
GO
ALTER TABLE [dbo].[tb_Order]  WITH CHECK ADD  CONSTRAINT [FK_Bill_user] FOREIGN KEY([ID_User])
REFERENCES [dbo].[detailUser] ([ID_user])
GO
ALTER TABLE [dbo].[tb_Order] CHECK CONSTRAINT [FK_Bill_user]
GO
ALTER TABLE [dbo].[tb_OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_detailBill_Bill] FOREIGN KEY([ID_bill])
REFERENCES [dbo].[tb_Order] ([ID_Bill])
GO
ALTER TABLE [dbo].[tb_OrderDetail] CHECK CONSTRAINT [FK_detailBill_Bill]
GO
ALTER TABLE [dbo].[tb_OrderDetail]  WITH CHECK ADD  CONSTRAINT [FK_detailBill_Product] FOREIGN KEY([ID_product])
REFERENCES [dbo].[tb_Product] ([Id])
GO
ALTER TABLE [dbo].[tb_OrderDetail] CHECK CONSTRAINT [FK_detailBill_Product]
GO
ALTER TABLE [dbo].[tb_ProductImage]  WITH CHECK ADD  CONSTRAINT [FK_tb_ProductImage_tb_Product] FOREIGN KEY([ProductId])
REFERENCES [dbo].[tb_Product] ([Id])
GO
ALTER TABLE [dbo].[tb_ProductImage] CHECK CONSTRAINT [FK_tb_ProductImage_tb_Product]
GO
