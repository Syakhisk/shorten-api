const types = {
  URL: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
}

exports.validate = (str, _type) =>{
  return !types[_type].test(str)
}
