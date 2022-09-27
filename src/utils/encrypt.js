import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://www.metools.info/code/c80.html

const publicKey =
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAO+a9Ly1Ga3VN0ohvYtlzdsFSwOFx4qx\n' +
  'hOZEQE47evz7kpIvYAAxU/n6RUmFfvUha2SrJVglORaZpSInC5o/FskCAwEAAQ=='

const privateKey =
  'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEA75r0vLUZrdU3SiG9\n' +
  'i2XN2wVLA4XHirGE5kRATjt6/PuSki9gADFT+fpFSYV+9SFrZKslWCU5FpmlIicL\n' +
  'mj8WyQIDAQABAkBAvqF1QIaA14WKLZXXThoTHdoISKUD0DY2NqkduqrgIuC4xFQz\n' +
  'Enf/HJafwAaGPRw2Hzi0X3TiAQDmGGI/TkQ1AiEA/BqIa182f9jsGD5tIYNJVrsP\n' +
  'tbxI3ngl2xb49lgIE1MCIQDzTvjzOIasnNjz+xyrPiBEYNC5GBtr5s5Ml/25F5dl\n' +
  '8wIgZyZ4EO65PuBD4buRLXgpRsptKB/s9NHWM2mX3juwui8CIAKlpE25GrX8Ctw0\n' +
  'qi4uwdkcmIi6+2lkHHB24trFp+8DAiEAnVRZy95h6Na29iz54rL0P5vihsohNehW\n' +
  'wEN1CKocXgc='

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
