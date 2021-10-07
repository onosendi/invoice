exports.needsToBeAnonymous = ({ req }) => {
  const id = req.session.passport?.user?.id;

  if (id) {
    return {
      redirect: {
        destination: '/invoices',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
