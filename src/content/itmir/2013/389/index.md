---
title: "Preference (프리퍼런스) 데이터 백업 복원 하기"
date: "2013-11-24T14:01:04+09:00"
category: "Android/App"
tags: []
description: "Android Preference 데이터를 파일로 백업하고 복원하는 코드를 정리했습니다."
draft: false
original_url: "https://itmir.tistory.com/389"
---

Preference를 백업하기 위한 코드 입니다

```java
private boolean saveSharedPreferencesToFile(File dst) {

    boolean res = false;

    ObjectOutputStream output = null;

    try {

        output = new ObjectOutputStream(new FileOutputStream(dst));

        SharedPreferences pref =

                            getSharedPreferences(prefName, MODE_PRIVATE);

        output.writeObject(pref.getAll());

        res = true;

    } catch (FileNotFoundException e) {

        e.printStackTrace();

    } catch (IOException e) {

        e.printStackTrace();

    }finally {

        try {

            if (output != null) {

                output.flush();

                output.close();

            }

        } catch (IOException ex) {

            ex.printStackTrace();

        }

    }

    return res;

}

@SuppressWarnings({ "unchecked" })

private boolean loadSharedPreferencesFromFile(File src) {

    boolean res = false;

    ObjectInputStream input = null;

    try {

        input = new ObjectInputStream(new FileInputStream(src));

            Editor prefEdit = getSharedPreferences(prefName, MODE_PRIVATE).edit();

            prefEdit.clear();

            Map<String, ?> entries = (Map<String, ?>) input.readObject();

            for (Entry<String, ?> entry : entries.entrySet()) {

                Object v = entry.getValue();

                String key = entry.getKey();

                if (v instanceof Boolean)

                    prefEdit.putBoolean(key, ((Boolean) v).booleanValue());

                else if (v instanceof Float)

                    prefEdit.putFloat(key, ((Float) v).floatValue());

                else if (v instanceof Integer)

                    prefEdit.putInt(key, ((Integer) v).intValue());

                else if (v instanceof Long)

                    prefEdit.putLong(key, ((Long) v).longValue());

                else if (v instanceof String)

                    prefEdit.putString(key, ((String) v));

            }

            prefEdit.commit();

        res = true;

    } catch (FileNotFoundException e) {

        e.printStackTrace();

    } catch (IOException e) {

        e.printStackTrace();

    } catch (ClassNotFoundException e) {

        e.printStackTrace();

    }finally {

        try {

            if (input != null) {

                input.close();

            }

        } catch (IOException ex) {

            ex.printStackTrace();

        }

    }

    return res;

}
```

출처 : <http://stackoverflow.com/questions/10864462/how-can-i-backup-sharedpreferences-to-sd-card>
