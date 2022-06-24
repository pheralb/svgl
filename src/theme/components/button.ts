const baseStyle = {
  borderRadius: "md",
  fontWeight: "light",
};

function variantPrimary() {
  const disabled = {
    bg: "purple.900",
    color: "white",
  };

  const loading = {
    bg: "purple.800",
    color: "white",
  };

  return {
    bg: "brand.purple",
    color: "white",
    _hover: {
      bg: "purple.900",
      _disabled: {
        ...disabled,
        _loading: loading,
      },
    },
    _active: {
      bg: "purple.700",
    },
    _disabled: {
      ...disabled,
      _loading: loading,
    },
  };
}

const variants = {
  primary: variantPrimary,
};

export default {
  baseStyle,
  variants,
};
