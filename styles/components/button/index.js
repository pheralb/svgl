const baseStyle = {
  borderRadius: "md",
  borderColor: "dark.400",
  boxShadow: "none",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  _disabled: {
    cursor: "not-allowed",
  },
  _focused: {
    borderColor: "dark.500",
  },
};

function variantPrimary() {
  const disabled = {
    bg: "dark.300",
    color: "dark.500",
  };

  const loading = {
    bg: "dark.600",
    color: "white",
  };

  return {
    bg: "dark.700",
    color: "white",
    _hover: {
      bg: "dark.800",
      _disabled: {
        ...disabled,
        _loading: loading,
      },
    },
    _active: {
      bg: "dark.800",
    },
    _disabled: {
      ...disabled,
      _loading: loading,
    },
  };
}

function variantSecondary() {
  const disabled = {
    bg: "dark.300",
    color: "gray.500",
  };

  const loading = {
    bg: "dark.600",
    color: "white",
  };

  return {
    bg: "dark.500",
    color: "white",
    _hover: {
      bg: "dark.700",
      _disabled: {
        ...disabled,
        _loading: loading,
      },
    },
    _active: {
      bg: "dark.800",
    },
    _disabled: {
      ...disabled,
      _loading: loading,
    },
  };
}

const variants = {
  primary: variantPrimary,
  secondary: variantSecondary,
};

export default {
  baseStyle,
  variants,
};
