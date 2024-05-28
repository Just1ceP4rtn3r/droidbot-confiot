class settings:
    device_serial = "14131FDF600073"

    # app_path = "/root/documents/droidbot-new/a2dp/a2dp.Vol_169.apk"
    # droid_output = "/root/documents/droidbot-new/a2dp/"
    app_path = "/root/documents/Output/Alexa/amazon.apk"
    droid_output = "/root/documents/Output/Alexa/host/result"  #"/root/documents/Output/mihome/mihome-smartscale-guest/result"

    Confiot_output = f"{droid_output}/Confiot"
    UI_output = Confiot_output + "/UI/"
    Static_comparation_output = Confiot_output + "/Comparation/"
    UIHierarchy_comparation_output = Static_comparation_output + "/UIHierarchy/"
    Feasibility_comparation_output = Static_comparation_output + "/Feasibility/"

    ##### Screen Capture resolution for GPT ######
    resol_x = 230
    resol_y = 512

    ##### UI Changed Type ######
    CONFIG_DISABLED = 0
    CONFIG_ENABLED = 1
    RESOURCE_REMOVED = 2

    ##### Crawler Limitation ######
    # {"activity": {bounds_str : view_id}}
    bounds_map = {}
    parent_map = {}
    # 仅仅只允许同一个center point的view被点击{bounds_limit}次
    bounds_limit = 3
    parent_limit = 10

    ##### BackButton ######
    # backs: 匹配中心点举例backs坐标50 pixel距离的views
    # precise_backs: 精准匹配某些views

    # backs = ([[27, 88], [86, 146]],)
    # precise_backs = ()

    # Huawei
    # backs = ([[27, 63], [135, 171]], [[37, 164], [106, 233]])
    # precise_backs = ([[360, 684], [468, 810]], )

    # 米家
    # backs = ([[30, 84], [93, 147]], [[243, 89], [804, 142]], [[813, 111], [837, 125]])
    # precise_backs = ()

    # amazon alexa
    # backs = ([[58,147],[127,216]],)
    # precise_backs = ()

    # XIAOAI

    # backs = ([[865,118],[950,184]],[[961,118],[1046,184]])
    # precise_backs = ()

    # Philips

    # backs = ([[0,54],[126,158]],)
    # precise_backs = ()


    # Mihome router

    backs = ([[32,84],[95,147]],)
    precise_backs = ()

    def __init__(self, device, app_path, droid_output) -> None:
        settings.device_serial = device
        settings.app_path = app_path
        settings.droid_output = droid_output

        settings.Confiot_output = settings.droid_output + "/Confiot/"
        settings.UI_output = settings.Confiot_output + "/UI/"
        settings.Static_comparation_output = settings.Confiot_output + "/Comparation/"
        settings.UIHierarchy_comparation_output = settings.Static_comparation_output + "/UIHierarchy/"
        settings.Feasibility_comparation_output = settings.Static_comparation_output + "/Feasibility/"
