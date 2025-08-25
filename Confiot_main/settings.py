class settings:
    device_serial = "192.168.72.132:5555"

    # app_path = "/root/documents/droidbot-new/a2dp/a2dp.Vol_169.apk"
    # droid_output = "/root/documents/droidbot-new/a2dp/"
    app_path = "/root/documents/Output/mihome/mihome-smartscale-CCS25-40min-droidbot-gpt-4o/mihome.apk"
    # droid_output = r"/root/ConfiotOutput/Output/Tuya/host/result"  #"/root/documents/Output/mihome/mihome-smartscale-guest/result"
    droid_output = r"/root/documents/Output/mihome/mihome-smartscale-CCS25-40min-droidbot-gpt-4o/host/result"

    Confiot_output = f"{droid_output}/Confiot/"
    UI_output = Confiot_output + "/UI/"
    Pages = Confiot_output + "/Pages/"

    violation_output = Confiot_output + "/Violation/"
    LLMConfiguration_output = Confiot_output + "/LLM_ConfigParsing"
    autodroid_output = Confiot_output + "/LLM_task_replay"
    Static_comparation_output = Confiot_output + "/Comparation/"
    UIHierarchy_comparation_output = Static_comparation_output + "/UIHierarchy/"
    Feasibility_comparation_output = Static_comparation_output + "/Feasibility/"

    screen_xy = (1080, 1920)
    LabelResoluation_threshold = 80

    ##### Screen Capture resolution######
    resol_x = 230
    resol_y = 512

    ##### UI Changed Type ######
    CONFIG_DISABLED = 0
    CONFIG_ENABLED = 1
    RESOURCE_REMOVED = 2

    ##### Crawler Limitation ######
    # {"activity": {bounds_str : view_id}}
    bounds_map = {}
    back_map = {}
    # 仅仅只允许同一个center point的view被点击{bounds_limit}次
    bounds_limit = 50
    back_limit = 5

    new_states = []
    
    ##### Blacklist Keywords ######
    # Keywords to skip during crawling
    blacklist_keywords = [
        'discover', 'service', 'shop', 'store', 'shopping', 'buy', 'cart', 'checkout', 'explore', 'pair',
        'payment', 'product', 'price', 'sale', 'discount', 'time', 'when', 'at a scheduled period', 'anytime', 'select an event',
        'marketplace', 'commerce', 'merchant', 'vendor', 'retail', 'goods', 'help', 'support', 'customer service', 'reboot', 'feedback',
        'catalog', 'inventory', 'wishlist', 'basket', 'billing', 'invoice', 'remove', 'terms of service', 'version', 'privacy policy', 'open source license', 'hostiottest@gmail.com', 'choose an account', 'guestiottest@gmail.com', 'more options',
        'refund', 'coupon', 'voucher', 'deal', 'offer'
    ]
    
    ##### Priority Keywords ######
    # Keywords to explore first when found during crawling
    priority_keywords = []
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

    backs = ([[32, 84], [95, 147]],)
    precise_backs = ()

    def __init__(self, device, app_path, droid_output) -> None:
        import json
        import os
        
        settings.device_serial = device
        settings.app_path = app_path
        settings.droid_output = droid_output

        settings.Confiot_output = settings.droid_output + "/Confiot/"
        settings.UI_output = settings.Confiot_output + "/UI/"
        settings.Pages = settings.Confiot_output + "/Pages/"

        settings.violation_output = settings.Confiot_output + "/Violation/"
        settings.LLMConfiguration_output = (
            settings.Confiot_output + "/LLM_ConfigParsing"
        )
        settings.autodroid_output = settings.Confiot_output + "/LLM_task_replay"
        settings.Static_comparation_output = settings.Confiot_output + "/Comparation/"
        settings.UIHierarchy_comparation_output = (
            settings.Static_comparation_output + "/UIHierarchy/"
        )
        settings.Feasibility_comparation_output = (
            settings.Static_comparation_output + "/Feasibility/"
        )
        
        # Load blacklist keywords from JSON file if it exists
        blacklist_file = os.path.join(droid_output, "blacklist_keywords.json")
        if os.path.exists(blacklist_file):
            try:
                with open(blacklist_file, 'r') as f:
                    data = json.load(f)
                    settings.blacklist_keywords = data.get('blacklist_keywords', settings.blacklist_keywords)
            except Exception as e:
                print(f"Error loading blacklist keywords: {e}")
                
        # Load priority keywords from JSON file if it exists
        priority_file = os.path.join(droid_output, "priority_keywords.json")
        if os.path.exists(priority_file):
            try:
                with open(priority_file, 'r') as f:
                    data = json.load(f)
                    settings.priority_keywords = data.get('priority_keywords', [])
            except Exception as e:
                print(f"Error loading priority keywords: {e}")
