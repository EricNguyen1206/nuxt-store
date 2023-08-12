export const PRODUCTS_TABLE_COLUMN = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Category",
    dataIndex: "categoryId",
    key: "categoryId",
  },
  {
    title: "Tag",
    dataIndex: "tagId",
    key: "tagId",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Action",
    key: "action",
  },
];

export const PRODUCTS = {
  data: [
    {
      id: "uyGmnpJhlQnMZthmZ977",
      description:
        "Bộ quần áo đem lại sự thoải mái mới mẻ. Thiết kế phong cách, phù hợp với bất cứ ai.",
      title: "AIRism Bộ Mặc Nhà Cotton Pha Ngắn Tay",
      category: "kid",
      price: 199000,
      image:
        "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/453994/item/vngoods_69_453994.jpg?width=750",
      created: {
        seconds: 1683738000,
        nanoseconds: 944000000,
      },
    },
    {
      id: "xvcQVjoq1xmiwOzFPixy",
      image:
        "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/459516/item/vngoods_69_459516.jpg?width=750",
      category: "kid",
      title: "Magic For All Quần Easy Short Vải Cotton Nhẹ",
      description:
        "Các nhân vật Disney/Pixar nổi tiếng trong thiết kế đầy màu sắc!",
      created: {
        seconds: 1683790817,
        nanoseconds: 396000000,
      },
      price: 199000,
    },
    {
      id: "rDYHPWSxpfZQHRq9Z9Fu",
      price: 1499000,
      title: "AirSense Áo Khoác (Siêu Nhẹ) (Wool Like)",
      created: {
        seconds: 1683790882,
        nanoseconds: 585000000,
      },
      description:
        "Mẫu áo khoác thoải mái, chất lượng. Chất liệu vải nhẹ nhàng thích hợp cho trang phục công sở.",
      category: "men",
      image:
        "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/448034/item/vngoods_08_448034.jpg?width=750",
    },
    {
      id: "fnSVjxpLV0xmx8GNyW94",
      created: {
        seconds: 1683790901,
        nanoseconds: 281000000,
      },
      title: "Quần Ống Suông Dáng Rũ Vải Satin",
      category: "women",
      image:
        "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/458127/item/vngoods_61_458127.jpg?width=320",
      description:
        "Quần satin thoải mái của chúng tôi, được cập nhật với một thiết kế mới tinh tế hơn.",
      price: 299000,
    },
  ],
  total: 12,
};

export const PRODUCTS_CATEGORY = [
  {
    image:
      "https://im.uniqlo.com/global-cms/spa/res8ae8b76f2764cdb0f9369ca7cb219de7fr.jpg",
    title: "Men",
    link: "/products?category=men",
  },
  {
    image:
      "https://im.uniqlo.com/global-cms/spa/resd0cef6bc0752a69d7366ea981a54ef40fr.jpg",
    title: "Women",
    link: "/products?category=women",
  },
  {
    image:
      "https://im.uniqlo.com/global-cms/spa/res794c07b01f2a65b73df40db38ad4861cfr.jpg",
    title: "Kid",
    link: "/products?category=kid",
  },
];
