/**
 * Created by Frankie.W on 2016/12/30.
 */
//-------------------------------------------------------------------------
var CSoundFormater = {
    // 格式化整个音乐音效文件列表
    FormatAllSounds: function() {
        for (var i = 0; i < s_SoundsPost.length; i++) {
            s_SoundsPost[i] = CSoundFormater._FormatSoundName(s_SoundsPost[i]);
        }
        for (var i = 0; i < s_SoundsPre.length; i++) {
            s_SoundsPre[i] = CSoundFormater._FormatSoundName(s_SoundsPre[i]);
        }
    },

    // 对单一声音文件名进行格式化
    _FormatSoundName: function(name) {
        var words = name.split('_');
        var result = '';
        var first = true;
        for (var i = 0; i < words.length; i++) {
            if (!first) result += ' ';
            first = false;
            result += words[i].charAt(0) + words[i].substr(1).toLowerCase();
        }
        return result;
    }
};
//-------------------------------------------------------------------------
// 实际执行
CSoundFormater.FormatAllSounds();
//-------------------------------------------------------------------------