const base_url='http://localhost:3000/'; //BASE URL
const app_dir='C:/auth/';
const mode='development';
const currentYear = new Date().getFullYear(); // CURRENT YEAR
const previousYear =  currentYear+1; //LAST YEAR
const cpyry=currentYear+'-'+previousYear;
const excel_sheet_path=app_dir+'assets/excels/';
module.exports={
    base_url:base_url,
    mode:mode,
    cpyry:cpyry,
    app_dir:app_dir,
    excel_sheet_path:excel_sheet_path
}