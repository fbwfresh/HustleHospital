const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  optimization: {
    usedExports: true
  },
  entry: {

    appointmentPage: path.resolve(__dirname, 'src', 'pages', 'appointmentPage.js'),
    patientPage: path.resolve(__dirname, 'src', 'pages', 'patientPage.js'),
    HustleHospitalMainPage: path.resolve(__dirname, 'src', 'pages', 'HustleHospitalMainPage.js'),
    doctorPage: path.resolve(__dirname,'src','pages','doctorPage.js'),

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    https: false,
    port: 8080,
    open: true,



    openPage: 'http://localhost:5001/HustleHospital.html',


    // diableHostChecks, otherwise we get an error about headers and the page won't render
    disableHostCheck: true,
    contentBase: 'packaging_additional_published_artifacts',
    // overlay shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: true

  },

  plugins: [
    new HtmlWebpackPlugin({
        template: './src/patients.html',
        filename: 'patients.html',
        inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/DoctorPage.html',
      filename: 'DoctorPage.html',

      inject: false
    }),
    new HtmlWebpackPlugin({
          template: './src/appointmentPage.html',
          filename: 'appointmentPage.html',

          inject: false
        }),
    new HtmlWebpackPlugin({
          template: './src/HustleHospital.html',
          filename: 'HustleHospital.html',
          inject: false
        }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('src/css'),
          to: path.resolve("dist/css")
        }
      ]
    }),
    new CleanWebpackPlugin()
  ]

}
