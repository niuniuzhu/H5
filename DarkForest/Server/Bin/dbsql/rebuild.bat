@echo off  
:begin
@echo ----------create databases------------ 
mysql -uroot -pron159753<createdb.sql

@echo ----------create tables------------ 
mysql -uroot -pron159753 df_accountdb<df_accountdb.sql