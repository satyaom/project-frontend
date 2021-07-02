<template>
<div>
  <a href="/" style="margin-right: 60%">
		<img class="header-logo-image" src="../assets/logo.svg" alt="Logo">
  </a>
  <button @click="loginPage" class="btn">Login</button>
  <button @click="signupPage" class="btn">Sign Up</button><br><br><br>
</div>
  <p style="color: #5072A7; font-size: 40px; margin-bottom: 5%"><b>Applying digital signatures to documents is easy with crypty.</b></p>
  <img src="../assets/backimg.jpg" height="600" width="1100" alt="background image">

  <div style="font-size: 35px; margin-top: 10%; margin-left: 5%; margin-right: 5%; font-weight: bold">
    <p style="color: #f88379">/ WHO WE ARE</p>
    <p style="color: #5072A7">We pioneered the development of e-signature technology, and today Pager helps organizations for authentication and signing of documents for the internal usage.</p>
  </div>
  <div class="row">
  <div style="font-size: 25px; width:45%; font-weight: bold">
    <img src="../assets/feature-icon-01.svg" alt="Feature 01">
    <p style="color: #f88379">Define</p>
    <p style="color: #5072A7">Digital signatures are like electronic “fingerprints.” In the form of a coded message, the digital signature securely associates a signer with a document in a recorded transaction. Digital signatures use a standard, accepted format, called Public Key Infrastructure (PKI), to provide the highest levels of security and universal acceptance. They are a specific signature technology implementation of electronic signature (eSignature).</p>
  </div>
  <div style="font-size: 25px; width:45%; margin-left:10%; font-weight: bold">
    <img src="../assets/feature-icon-02.svg" alt="Feature 01">
    <p style="color: #f88379">History</p>
    <p style="color: #5072A7">In 1976, Whitfield Diffie and Martin Hellman first described the notion of a digital signature scheme, although they only conjectured that such schemes existed based on functions that are trapdoor one-way permutations. Soon afterwards, Ronald Rivest, Adi Shamir, and Len Adleman invented the RSA algorithm, which could be used to produce primitive digital signatures (although only as a proof-of-concept – "plain" RSA signatures are not secure).</p>
  </div>
  <div style="font-size: 25px; width:45%; font-weight: bold">
    <img src="../assets/feature-icon-03.svg" alt="Feature 01">
    <p style="color: #f88379">Current Scenario</p>
    <p style="color: #5072A7">The global digital signature market valued at US$ 879.6 Mn in 2018 and is projected to reach US$ 6,128.0 Mn by the end of 2026, exhibiting a CAGR of 28.77% during the forecast period (2019 – 2026). Owing to the rapid advances in e-business, there is an increasing need for online security and authentication.</p>
  </div>
  <div style="font-size: 25px; width:45%; margin-left:10%; font-weight: bold">
    <img src="../assets/feature-icon-04.svg" alt="Feature 01">
    <p style="color: #f88379">Applications</p>
    <p style="color: #5072A7">You can use Digital Signature Certificates for the following: For sending and receiving digitally signed and encrypted emails. For carrying out secure web-based transactions, or to identify other participants of web-based transactions.</p>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import router from '../router/index';
export default {
  name: 'Home',
  methods:{
    loginPage() {
      router.push('/login');
    },
    signupPage() {
      router.push('/signup');
    }
  }
}
</script>
<style>
.btn {
  box-sizing: border-box;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background-color: transparent;
  border: 2px solid;
  border-radius: 0.6em;
  color: #6666ff;
  cursor: pointer;
 
  -webkit-align-self: center;
      -ms-flex-item-align: center;
          align-self: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  margin: 20px;
  padding: 1.2em 2.8em;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
.btn:hover, .btn:focus {
  color: black;

  outline: 0;
}
.row {
    margin-top: 2%;
    margin-left: 7%;
    margin-right: 7%;
    padding-bottom: 10%;
    display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
    text-align: center;
    height: 95vh;
    background-image: url("../assets/hero-back-illustration.svg");
}
</style>
