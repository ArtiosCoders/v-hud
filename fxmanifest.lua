fx_version "cerulean"
lua54 'yes'
game 'gta5'

author 'Discord: vipex.v'
ui_page 'web/build/index.html'

shared_script "shared/config.lua"
client_scripts {
	"client/utils.lua",
	"client/client.lua"
}
-- server_script "server/**/*"

files {
	'web/build/index.html',
	'web/build/**/*',
}